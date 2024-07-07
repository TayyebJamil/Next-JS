"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";

interface Country {
  id: number;
  name: string;
  isocode: string;
}

export function Countries_list() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [newCountry, setNewCountry] = useState({ name: "", isocode: "" });
  const filteredCountries = countries.filter((country) =>
    country.name && country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCountries = async () => {
      console.log(process.env.NEXT_PUBLIC_API_BASE_URL_COUNTRIES!)
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL_COUNTRIES!);
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  const handleAddCountry = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL_COUNTRIES!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCountry),
      });

      if (!response.ok) {
        throw new Error("Failed to add country");
      }

      const addedCountry: Country = await response.json();
      setCountries((prevCountries) => [...prevCountries, addedCountry]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCountry = async () => {
    if (!editingCountry) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_COUNTRIES!}/${editingCountry.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCountry),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit country");
      }

      const updatedCountry: Country = await response.json();
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === updatedCountry.id ? updatedCountry : country
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCountry = async (countryId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_COUNTRIES!}/${countryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete country");
      }

      setCountries((prevCountries) =>
        prevCountries.filter((country) => country.id !== countryId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    if (editingCountry?.id === -1) {
      handleAddCountry();
    } else {
      handleEditCountry();
    }
    setIsModalOpen(false);
    setEditingCountry(null);
    setNewCountry({ name: "", isocode: "" });
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Country Management</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md w-full"
            />
          </div>
          <Button
            onClick={() => {
              setEditingCountry({ id: -1, name: "", isocode: "" });
              setIsModalOpen(true);
            }}
          >
            Add Country
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ISO Code</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCountries.map((country) => (
                <TableRow key={country.id}>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>{country.isocode}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingCountry(country);
                          setNewCountry({
                            name: country.name,
                            isocode: country.isocode,
                          });
                          setIsModalOpen(true);
                        }}
                      >
                        <FilePenIcon className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteCountry(country.id)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-6 max-w-md w-full">
          <DialogHeader>
            <DialogTitle>
              {editingCountry?.id === -1 ? "Add Country" : "Edit Country"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newCountry.name}
                onChange={(e) =>
                  setNewCountry({ ...newCountry, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="isoCode">ISO Code</Label>
              <Input
                id="isoCode"
                value={newCountry.isocode}
                onChange={(e) =>
                  setNewCountry({ ...newCountry, isocode: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingCountry?.id === -1 ? "Add" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilePenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );}
