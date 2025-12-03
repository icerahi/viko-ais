import { DashboardRepository } from "../../infrastructure/repositories/dashboard.repository";

export class DashboardService {
  constructor(private gradeRepository: DashboardRepository) {}

  async getDashboardInfo() {
    return await this.gradeRepository.getDashboardInfo();
  }
}
