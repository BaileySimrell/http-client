'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JsonView from '@/components/JsonView'

export default function Home() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [response, setResponse] = useState('')
  const [headers, setHeaders] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(url, { method })
      const data = await res.text()
      setResponse(data)
      
      // Extract headers
      const headerObj: Record<string, string> = {}
      res.headers.forEach((value, key) => {
        headerObj[key] = value
      })
      setHeaders(headerObj)
    } catch (error) {
      setResponse('Error: ' + (error as Error).message)
      setHeaders({})
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Lightweight HTTP Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
      <Tabs defaultValue="response" className="mt-4">
        <TabsList>
          <TabsTrigger value="response">Response</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
        </TabsList>
        <TabsContent value="response">
          <div className="bg-gray-100 rounded-md overflow-auto">
            <JsonView data={response} />
          </div>
        </TabsContent>
        <TabsContent value="headers">
          <div className="bg-gray-100 rounded-md overflow-auto">
            <JsonView data={JSON.stringify(headers)} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}