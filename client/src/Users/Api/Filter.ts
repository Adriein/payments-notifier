import { ApiService } from "../../Shared/Services/ApiService";
import { Filter } from "../Models/Filter";

const api = ApiService.instance();

export const FilterCall = {
  async getClientTableFilters(): Promise<Filter[]> {
    const response = await api.get<{ data: Filter[] }>('/filter');

    return response.data;
  }
}