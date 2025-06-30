import { validateRequestForm } from "@/entities/request/requestModel";
import {
  type Request,
  type RequestFormData,
} from "@/entities/request/requestTypes";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRequestsStore = defineStore("requests", () => {
  const requests = ref<Request[]>(loadFromLocalStorage());

  function loadFromLocalStorage(): Request[] {
    const saved = localStorage.getItem("requests");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((r: any) => ({
        ...r,
        createdAt: new Date(r.createdAt),
      }));
    }
    return [
      {
        id: 1,
        title: "Заявка на ремонт",
        description: "Ремонт оборудования в цеху",
        category: "Ремонт",
        createdAt: new Date("2025-06-20"),
      },
      {
        id: 2,
        title: "Запрос на материалы",
        description: "Поставка строительных материалов",
        category: "Поставка",
        createdAt: new Date("2025-06-21"),
      },
    ];
  }

  function saveToLocalStorage() {
    localStorage.setItem("requests", JSON.stringify(requests.value));
  }

  const addRequest = (data: RequestFormData) => {
    const errors = validateRequestForm(data);
    if (Object.keys(errors).length) return { success: false, errors };
    const newRequest: Request = {
      id: requests.value.length
        ? Math.max(...requests.value.map((r) => r.id)) + 1
        : 1,
      title: data.title,
      description: data.description,
      category: data.category,
      createdAt: new Date(),
    };
    requests.value.push(newRequest);
    saveToLocalStorage();
    return { success: true };
  };

  const updateRequest = (id: number, data: RequestFormData) => {
    const errors = validateRequestForm(data);
    if (Object.keys(errors).length) return { success: false, errors };
    const index = requests.value.findIndex((r) => r.id === id);
    if (index !== -1) {
      requests.value[index] = { ...requests.value[index], ...data };
      saveToLocalStorage();
      return { success: true };
    }
    return { success: false, errors: { title: "Заявка не найдена" } };
  };

  const deleteRequest = (id: number) => {
    requests.value = requests.value.filter((r) => r.id !== id);
    saveToLocalStorage();
  };

  const getRequestById = computed(
    () => (id: number) => requests.value.find((r) => r.id === id)
  );

  return { requests, addRequest, updateRequest, deleteRequest, getRequestById };
});
