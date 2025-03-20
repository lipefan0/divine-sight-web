import api from './api';
import { AnalysisRequest, AnalysisResponse, AnalysisType } from '../types/bible';

// Dados mockados para tipos de análise para uso quando a API falhar
const mockAnalysisTypes: AnalysisType[] = [
  { id: 'general', name: 'Análise Geral', description: 'Analisa o contexto geral da passagem bíblica.' },
  { id: 'historical', name: 'Análise Histórica', description: 'Examina o contexto histórico e cultural da passagem.' },
  { id: 'theological', name: 'Análise Teológica', description: 'Estuda os princípios teológicos e doutrinários da passagem.' },
  { id: 'devotional', name: 'Análise Devocional', description: 'Oferece aplicações práticas e devocionais da passagem.' }
];

export const analysisService = {
  async getAnalysisTypes(): Promise<AnalysisType[]> {
    try {
      const response = await api.get<AnalysisType[]>('/api/ai/analysis-types');
      // Verifica se o resultado é um array válido não vazio
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      console.log('API retornou dados inválidos para tipos de análise, usando mockados');
      return mockAnalysisTypes;
    } catch (error) {
      console.error('Erro ao buscar tipos de análise:', error);
      // Fallback para dados mockados em caso de erro
      return mockAnalysisTypes;
    }
  },

  async analyzePassage(request: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      const response = await api.post<AnalysisResponse>('/api/ai/analyze', request);
      return response.data;
    } catch (error) {
      console.error('Erro ao analisar passagem:', error);
      // Fallback para um erro formatado
      throw new Error('Não foi possível realizar a análise. Por favor, tente novamente.');
    }
  }
};
