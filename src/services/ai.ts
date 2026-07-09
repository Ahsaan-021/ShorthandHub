// AI Service - Modular architecture for future AI integration
// Currently a placeholder. Replace implementations when integrating OpenAI/Anthropic.

export interface AIProvider {
  explainOutline(outline: string): Promise<string>;
  generateExercises(topic: string, count: number): Promise<string[]>;
  reviewMistakes(mistakes: string[]): Promise<string>;
  getRecommendations(userId: string): Promise<string[]>;
}

class OpenAIService implements AIProvider {
  async explainOutline(outline: string): Promise<string> {
    throw new Error("OpenAI not configured. Implement when ready.");
  }
  async generateExercises(topic: string, count: number): Promise<string[]> {
    throw new Error("OpenAI not configured.");
  }
  async reviewMistakes(mistakes: string[]): Promise<string> {
    throw new Error("OpenAI not configured.");
  }
  async getRecommendations(userId: string): Promise<string[]> {
    throw new Error("OpenAI not configured.");
  }
}

export const aiService: AIProvider = new OpenAIService();
