// category.model.ts
export interface Subcategory {
    id?: number;
    name: string;
    description: string;
    parentCategoryId: number; 
  }
  
  export interface Category {
    id: number;
    name: string;
    description: string;
    subcategories: Subcategory[]; // Ensure this matches the backend structure
  }
  