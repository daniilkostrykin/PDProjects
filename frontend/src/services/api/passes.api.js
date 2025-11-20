// src/services/api/passes.api.js
import { $host, $authHost } from "@/http";

export const PassesApi = {
  async listMine(params = {}) {
    const { status, page = 0, size = 20 } = params;
    const query = new URLSearchParams();
    if (status) query.append("status", status);
    query.append("page", page);
    query.append("size", size);

    const response = await $authHost.get(`/api/v1/passes?${query}`);
    return response.data;
  },

  async create(payload) {
    const response = await $authHost.post("/api/v1/passes", payload);
    return response.data;
  },

  async listAll(params = {}) {
    const { status = "PENDING", page = 0, size = 20 } = params;
    const query = new URLSearchParams();
    query.append("status", status);
    query.append("page", page);
    query.append("size", size);

    const response = await $authHost.get(`/api/v1/admin/passes?${query}`);
    return response.data.content || response.data;
  },

  async approve(id) {
    const response = await $authHost.post(`/api/v1/admin/passes/${id}/approve`);
    return response.data;
  },

  async reject(id) {
    const response = await $authHost.post(`/api/v1/admin/passes/${id}/reject`);
    return response.data;
  },

  async stats() {
    const response = await $authHost.get("/api/v1/admin/passes/stats");
    return response.data;
  },
};
