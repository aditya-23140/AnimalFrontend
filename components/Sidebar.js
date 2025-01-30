import { Button } from "@/components/ui/button";

export function Sidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto h-screen pt-10 rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Categories</h2>
      <nav>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className="w-full justify-start mb-2 bg-gray-700 hover:bg-gray-600 text-white focus:bg-gray-950"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </nav>
    </div>
  );
}
