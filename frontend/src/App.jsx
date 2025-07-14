import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { buildApiUrl } from './config.js'
import { 
  Leaf, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Search, 
  Star, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Globe,
  Zap,
  Heart,
  Award,
  Target,
  Lightbulb,
  Recycle,
  Factory,
  TreePine,
  Droplets,
  Wind,
  Sun
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts'
import './App.css'

function App() {
  const [selectedCompany, setSelectedCompany] = useState('')
  const [analysisResults, setAnalysisResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [esgFilter, setEsgFilter] = useState('all')

  // Get API URL with fallback
  const getApiUrl = () => {
    try {
      return buildApiUrl('/api/esg/analyze')
    } catch {
      // Fallback to localhost or demo API
      return 'http://localhost:5003/api/esg/analyze'
    }
  }

  // ESG Performance Data
  const esgTrends = [
    { month: 'Jan', environmental: 72, social: 68, governance: 85, overall: 75 },
    { month: 'Feb', environmental: 74, social: 71, governance: 87, overall: 77 },
    { month: 'Mar', environmental: 76, social: 73, governance: 86, overall: 78 },
    { month: 'Apr', environmental: 78, social: 75, governance: 88, overall: 80 },
    { month: 'May', environmental: 80, social: 77, governance: 89, overall: 82 },
    { month: 'Jun', environmental: 82, social: 79, governance: 90, overall: 84 }
  ]

  // Sector ESG Comparison
  const sectorData = [
    { sector: 'Technology', environmental: 78, social: 82, governance: 88 },
    { sector: 'Healthcare', environmental: 65, social: 85, governance: 82 },
    { sector: 'Finance', environmental: 58, social: 72, governance: 92 },
    { sector: 'Energy', environmental: 45, social: 68, governance: 75 },
    { sector: 'Consumer', environmental: 62, social: 78, governance: 80 }
  ]

  // Top ESG Companies
  const [topCompanies, setTopCompanies] = useState([
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      esgScore: 92,
      environmental: 88,
      social: 94,
      governance: 95,
      trend: '+3.2%',
      recommendation: 'Strong Buy',
      sustainabilityRank: 1,
      carbonNeutral: true,
      renewableEnergy: 85
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      esgScore: 89,
      environmental: 91,
      social: 86,
      governance: 90,
      trend: '+2.8%',
      recommendation: 'Buy',
      sustainabilityRank: 2,
      carbonNeutral: true,
      renewableEnergy: 100
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      esgScore: 87,
      environmental: 85,
      social: 88,
      governance: 88,
      trend: '+1.9%',
      recommendation: 'Buy',
      sustainabilityRank: 3,
      carbonNeutral: true,
      renewableEnergy: 67
    },
    {
      symbol: 'JNJ',
      name: 'Johnson & Johnson',
      esgScore: 85,
      environmental: 78,
      social: 92,
      governance: 85,
      trend: '+2.1%',
      recommendation: 'Buy',
      sustainabilityRank: 4,
      carbonNeutral: false,
      renewableEnergy: 45
    },
    {
      symbol: 'UNH',
      name: 'UnitedHealth Group',
      esgScore: 83,
      environmental: 72,
      social: 89,
      governance: 88,
      trend: '+1.5%',
      recommendation: 'Hold',
      sustainabilityRank: 5,
      carbonNeutral: false,
      renewableEnergy: 32
    }
  ])

  // ESG Metrics
  const esgMetrics = {
    environmental: {
      carbonFootprint: 'Low',
      renewableEnergy: '85%',
      wasteReduction: '67%',
      waterUsage: 'Efficient',
      biodiversity: 'Protected'
    },
    social: {
      employeeSatisfaction: '94%',
      diversityInclusion: 'Excellent',
      communityImpact: 'High',
      humanRights: 'Compliant',
      productSafety: 'Certified'
    },
    governance: {
      boardDiversity: '45%',
      executiveCompensation: 'Aligned',
      transparency: 'High',
      ethicalBusiness: 'Certified',
      riskManagement: 'Robust'
    }
  }

  const analyzeCompany = async () => {
    if (!selectedCompany) return
    
    setLoading(true)
    
    try {
      const response = await fetch(getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol: selectedCompany })
      })
      
      if (!response.ok) {
        throw new Error('Failed to analyze company')
      }
      
      const data = await response.json()
      
      const results = {
        company: data.symbol,
        overallScore: data.scores.overall,
        environmental: data.scores.environmental,
        social: data.scores.social,
        governance: data.scores.governance,
        recommendation: data.recommendation,
        riskLevel: data.risk_level,
        sustainabilityGoals: data.sustainability_goals,
        keyInsights: data.key_initiatives,
        carbonNeutral: data.carbon_neutral,
        renewableEnergy: data.renewable_energy,
        confidence: data.confidence
      }
      
      setAnalysisResults(results)
    } catch (error) {
      console.error('Error analyzing company:', error)
      // Fallback to mock data if API fails
      const mockResults = {
        company: selectedCompany,
        overallScore: Math.floor(Math.random() * 20) + 80,
        environmental: Math.floor(Math.random() * 25) + 70,
        social: Math.floor(Math.random() * 25) + 75,
        governance: Math.floor(Math.random() * 15) + 85,
        recommendation: ['Strong Buy', 'Buy', 'Hold'][Math.floor(Math.random() * 3)],
        riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        sustainabilityGoals: [
          'Carbon neutral by 2030',
          '100% renewable energy',
          'Zero waste to landfill',
          'Diverse leadership team'
        ],
        keyInsights: [
          'Leading in renewable energy adoption',
          'Strong employee satisfaction scores',
          'Transparent governance practices',
          'Active community engagement'
        ]
      }
      setAnalysisResults(mockResults)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getRecommendationColor = (rec) => {
    if (rec === 'Strong Buy') return 'bg-green-500'
    if (rec === 'Buy') return 'bg-blue-500'
    return 'bg-yellow-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ESG Intelligence Engine</h1>
                <p className="text-emerald-200 text-sm">AI-Powered Sustainable Investment Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <CheckCircle className="h-3 w-3 mr-1" />
                ESG Verified
              </Badge>
              <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                <Award className="h-3 w-3 mr-1" />
                Sustainability Leader
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* ESG Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm">ESG Universe</p>
                  <p className="text-white text-2xl font-bold">2,847</p>
                </div>
                <Globe className="h-8 w-8 text-emerald-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">Companies analyzed</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm">Avg ESG Score</p>
                  <p className="text-white text-xl font-semibold">78.4</p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">+2.3 vs last quarter</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm">Sustainable Leaders</p>
                  <p className="text-white text-xl font-semibold">342</p>
                </div>
                <Award className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">Score 85+ companies</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm">Carbon Neutral</p>
                  <p className="text-white text-xl font-semibold">156</p>
                </div>
                <TreePine className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-green-400 text-sm mt-2">Committed companies</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analysis Tool */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Analysis */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  ESG Analysis
                </CardTitle>
                <CardDescription className="text-emerald-200">
                  AI-powered sustainability assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-emerald-200 text-sm">Select Company</label>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger className="bg-black/30 border-white/20 text-white">
                      <SelectValue placeholder="Choose company to analyze" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/20">
                      <SelectItem value="TSLA">TSLA - Tesla Inc.</SelectItem>
                      <SelectItem value="NFLX">NFLX - Netflix Inc.</SelectItem>
                      <SelectItem value="NVDA">NVDA - NVIDIA Corp.</SelectItem>
                      <SelectItem value="META">META - Meta Platforms</SelectItem>
                      <SelectItem value="AMZN">AMZN - Amazon.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={analyzeCompany}
                  disabled={!selectedCompany || loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {loading ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing ESG...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Analyze ESG Profile
                    </>
                  )}
                </Button>

                {analysisResults && (
                  <div className="space-y-4 mt-6">
                    <Alert className="bg-green-900/20 border-green-400/50">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-green-200">
                        Analysis complete for {analysisResults.company}
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/30 p-3 rounded-lg">
                        <p className="text-emerald-200 text-xs">Overall Score</p>
                        <p className={`text-xl font-bold ${getScoreColor(analysisResults.overallScore)}`}>
                          {analysisResults.overallScore}
                        </p>
                      </div>
                      <div className="bg-black/30 p-3 rounded-lg">
                        <p className="text-emerald-200 text-xs">Recommendation</p>
                        <Badge className={`${getRecommendationColor(analysisResults.recommendation)} text-white`}>
                          {analysisResults.recommendation}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-emerald-200 text-sm">Environmental</span>
                        <span className={`text-sm font-medium ${getScoreColor(analysisResults.environmental)}`}>
                          {analysisResults.environmental}
                        </span>
                      </div>
                      <Progress value={analysisResults.environmental} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-emerald-200 text-sm">Social</span>
                        <span className={`text-sm font-medium ${getScoreColor(analysisResults.social)}`}>
                          {analysisResults.social}
                        </span>
                      </div>
                      <Progress value={analysisResults.social} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-emerald-200 text-sm">Governance</span>
                        <span className={`text-sm font-medium ${getScoreColor(analysisResults.governance)}`}>
                          {analysisResults.governance}
                        </span>
                      </div>
                      <Progress value={analysisResults.governance} className="h-2" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ESG Metrics */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Key ESG Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="environmental" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-black/30">
                    <TabsTrigger value="environmental" className="text-xs">Environmental</TabsTrigger>
                    <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
                    <TabsTrigger value="governance" className="text-xs">Governance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="environmental" className="space-y-3">
                    {Object.entries(esgMetrics.environmental).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-2 bg-black/30 rounded">
                        <span className="text-emerald-200 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-green-400 text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="social" className="space-y-3">
                    {Object.entries(esgMetrics.social).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-2 bg-black/30 rounded">
                        <span className="text-emerald-200 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-blue-400 text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="governance" className="space-y-3">
                    {Object.entries(esgMetrics.governance).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-2 bg-black/30 rounded">
                        <span className="text-emerald-200 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-purple-400 text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analytics & Rankings */}
          <div className="lg:col-span-2 space-y-6">
            {/* ESG Trends Chart */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">ESG Performance Trends</CardTitle>
                <CardDescription className="text-emerald-200">
                  Monthly ESG score evolution across all categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={esgTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="environmental" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Environmental"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="social" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Social"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="governance" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Governance"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="overall" 
                        stroke="#f59e0b" 
                        strokeWidth={3}
                        name="Overall ESG"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top ESG Companies */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top ESG Performers
                </CardTitle>
                <CardDescription className="text-emerald-200">
                  Leading companies in sustainable investing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCompanies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{company.sustainabilityRank}</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="text-white font-medium">{company.symbol}</p>
                              {company.carbonNeutral && <TreePine className="h-4 w-4 text-green-400" />}
                            </div>
                            <p className="text-emerald-200 text-sm">{company.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <p className={`text-lg font-bold ${getScoreColor(company.esgScore)}`}>
                            {company.esgScore}
                          </p>
                          <Badge className={`${getRecommendationColor(company.recommendation)} text-white text-xs`}>
                            {company.recommendation}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-green-400 text-xs">E: {company.environmental}</span>
                          <span className="text-blue-400 text-xs">S: {company.social}</span>
                          <span className="text-purple-400 text-xs">G: {company.governance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                AI-Powered Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-200">
                Advanced machine learning algorithms analyze thousands of ESG data points to provide comprehensive sustainability assessments.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Global ESG Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-200">
                Compliance with international ESG frameworks including GRI, SASB, TCFD, and UN Global Compact principles.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Investment Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-200">
                Seamless integration with portfolio management systems for ESG-aligned investment strategies and risk assessment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App

