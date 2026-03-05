"use client"

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, PieChart } from "lucide-react"

interface BookingTrendsChartProps {
  data: {
    labels: string[]
    data: number[]
  }
}

export function BookingTrendsChart({ data }: BookingTrendsChartProps) {
  const options: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      height: 300,
      style: {
        fontFamily: 'inherit'
      }
    },
    title: { text: undefined },
    xAxis: {
      categories: data.labels,
      gridLineWidth: 0,
      lineWidth: 0,
      labels: {
        style: { color: '#94a3b8', fontSize: '10px', fontWeight: 'bold' }
      }
    },
    yAxis: {
      title: { text: undefined },
      gridLineColor: 'rgba(226, 232, 240, 0.4)',
      labels: {
        style: { color: '#94a3b8', fontSize: '10px' }
      }
    },
    tooltip: {
      shared: true,
      backgroundColor: '#1e293b',
      borderWidth: 0,
      borderRadius: 12,
      style: { color: '#f8fafc' },
      headerFormat: '<span style="font-size: 10px; font-weight: bold; color: #94a3b8">{point.key}</span><br/>'
    },
    credits: { enabled: false },
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(59, 130, 246, 0.2)'],
            [1, 'rgba(59, 130, 246, 0)']
          ]
        },
        marker: {
          enabled: false,
          states: {
            hover: { enabled: true, radius: 5 }
          }
        },
        lineWidth: 3,
        lineColor: '#3b82f6',
        states: {
          hover: { lineWidth: 3 }
        }
      }
    },
    series: [{
      name: 'Bookings',
      type: 'areaspline',
      data: data.data,
      showInLegend: false
    }]
  }

  return (
    <Card className="border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
          <Activity className="h-4 w-4 text-blue-500" /> Peak Booking Hours
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-2 pb-4">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  )
}

interface RideStatusChartProps {
  data: {
    name: string
    y: number
  }[]
}

export function RideStatusChart({ data }: RideStatusChartProps) {
  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 300,
      style: {
        fontFamily: 'inherit'
      }
    },
    title: { text: undefined },
    tooltip: {
      backgroundColor: '#1e293b',
      borderWidth: 0,
      borderRadius: 12,
      style: { color: '#f8fafc' }
    },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            fontSize: '10px',
            color: '#64748b',
            textOutline: 'none'
          }
        },
        innerSize: '65%',
        borderWidth: 0,
        colors: [
          '#3b82f6', // blue
          '#10b981', // emerald
          '#f59e0b', // amber
          '#ef4444', // red
          '#8b5cf6', // violet
          '#ec4899'  // pink
        ]
      }
    },
    series: [{
      name: 'Rides',
      type: 'pie',
      data: data,
      showInLegend: false
    }]
  }

  return (
    <Card className="border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
          <PieChart className="h-4 w-4 text-emerald-500" /> Ride Status Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-2 pb-4">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  )
}
