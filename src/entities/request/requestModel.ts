import {
  REQUEST_CATEGORIES,
  type RequestFormData,
  type RequestFormErrors,
} from "./requestTypes";

export function validateRequestForm(data: RequestFormData): RequestFormErrors {
  const errors: RequestFormErrors = {};
  if (!data.title.trim()) {
    errors.title = "Заголовок обязателен";
  }
  if (!data.description.trim()) {
    errors.description = "Описание обязательно";
  }
  if (!data.category || !REQUEST_CATEGORIES.includes(data.category)) {
    errors.category = "Выберите действительную категорию";
  }
  return errors;
}
