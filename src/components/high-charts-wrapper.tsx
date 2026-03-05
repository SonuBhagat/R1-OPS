"use client"

import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

if (typeof window !== 'undefined') {
  // Add any Highcharts modules here if needed (e.g., Maps, 3D, Accessibility)
  // require('highcharts/modules/accessibility')(Highcharts);
}

const HighChartsWrapper = (props: HighchartsReact.Props) => {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-[300px] w-full animate-pulse bg-muted rounded-lg" />
  }

  return <HighchartsReact highcharts={Highcharts} {...props} />
}

export default HighChartsWrapper
