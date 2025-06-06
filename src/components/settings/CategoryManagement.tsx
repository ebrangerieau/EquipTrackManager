import React, { useState, useEffect } from 'react';
import { Tag, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { useEquipmentStore } from '../../store/equipmentStore';
import { handleError, handleSuccess } from '../../lib/utils';
import type { Category, EditingCategory } from '../../types/category';

export function CategoryManagement() {
  const { categories, fetchCategories, updateCategories } = useEquipmentStore();
  const [editingCategory, setEditingCategory] = useState<EditingCategory | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (category: Category) => {
    setEditingCategory({ id: category.id, name: category.name });
  };

  const handleSave = async (category: EditingCategory) => {
    try {
      const updatedCategories = categories.map(c => 
        c.id === category.id ? { ...c, name: category.name } : c
      );
      await updateCategories(updatedCategories);
      setEditingCategory(null);
      handleSuccess('Catégorie mise à jour avec succès');
    } catch (error) {
      handleError(error, 'Erreur lors de la mise à jour de la catégorie');
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      const updatedCategories = categories.filter(c => c.id !== categoryId);
      await updateCategories(updatedCategories);
      handleSuccess('Catégorie supprimée avec succès');
    } catch (error) {
      handleError(error, 'Erreur lors de la suppression de la catégorie');
    }
  };

  const handleAdd = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const newCategory: Category = {
        id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        name: newCategoryName.trim()
      };
      await updateCategories([...categories, newCategory]);
      setIsAdding(false);
      setNewCategoryName('');
      handleSuccess('Catégorie ajoutée avec succès');
    } catch (error) {
      handleError(error, 'Erreur lors de l\'ajout de la catégorie');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex items-center">
          <Tag className="h-5 w-5 mr-2 text-gray-400" />
          Gestion des catégories
        </h3>
        
        <div className="mt-6 space-y-4">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              {editingCategory?.id === category.id ? (
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  />
                  <button
                    onClick={() => handleSave(editingCategory)}
                    className="p-1 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-900 dark:text-white">{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-1 text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {isAdding ? (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nom de la catégorie"
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800"
              />
              <button
                onClick={handleAdd}
                className="p-1 text-green-600 hover:text-green-700"
              >
                <Check className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewCategoryName('');
                }}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-5 w-5" />
              <span>Ajouter une catégorie</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}