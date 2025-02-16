"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Descriptions } from "@/global/constants"
import { useCompaniesDescription } from "@/context/use-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, Mail, MapPin, Bookmark, Users, Building } from "lucide-react"
import Footer from "@/components/layout/Footer"

function Description() {
  const { companiesName } = useParams()
  const { setSelectedCompanies } = useCompaniesDescription()
  const [isBookmarked, setIsBookmarked] = useState(false)

  const CompaniesDescriptions = Descriptions.find(
    (company: any) => company.name.replace(/\s+/g, "-").toLowerCase() === companiesName,
  )

  useEffect(() => {
    if (CompaniesDescriptions) {
      setSelectedCompanies(CompaniesDescriptions)
      localStorage.setItem("selectedCompanies", JSON.stringify(CompaniesDescriptions))
    }
  }, [CompaniesDescriptions, setSelectedCompanies])

  if (!CompaniesDescriptions) {
    return <p className="text-center text-red-500">Companies Description not found!</p>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="border-0 shadow-sm">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{CompaniesDescriptions.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1">
                  {CompaniesDescriptions.founded && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Founded {CompaniesDescriptions.founded}</span>
                    </div>
                  )}
                  {CompaniesDescriptions.industry && (
                    <Badge variant="secondary">{CompaniesDescriptions.industry}</Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? "text-primary" : ""}
            >
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Locations */}
          {CompaniesDescriptions.locations && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Locations
              </h2>
              <div className="flex flex-wrap gap-2">
                {CompaniesDescriptions.locations.map((location: string) => (
                  <Badge key={location} variant="secondary">
                    {location}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* About */}
          {CompaniesDescriptions.company_profile && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="text-muted-foreground leading-relaxed">{CompaniesDescriptions.company_profile}</p>
            </div>
          )}

          {/* Leadership Team */}
          {CompaniesDescriptions.leadership_team && Array.isArray(CompaniesDescriptions.leadership_team) && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Leadership Team
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CompaniesDescriptions.leadership_team.map((member: any) => (
                  <div key={member.name} className="flex flex-col items-center text-center space-y-2">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.picture} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact and Office Location */}
          <div className="grid md:grid-cols-2 gap-6">
            {CompaniesDescriptions.contact_information && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h2>
                <p className="text-muted-foreground">{CompaniesDescriptions.contact_information}</p>
              </div>
            )}

            {CompaniesDescriptions.office_locations && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Office Addresses
                </h2>
                {Array.isArray(CompaniesDescriptions.office_locations) ? (
                  <ul className="space-y-2 text-muted-foreground">
                    {CompaniesDescriptions.office_locations.map((location: string) => (
                      <li key={location}>{location}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{CompaniesDescriptions.office_locations}</p>
                )}
              </div>
            )}
          </div>

          {/* Office Environment */}
          {CompaniesDescriptions.office_environment && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Office Environment
              </h2>
              <p className="text-muted-foreground">{CompaniesDescriptions.office_environment}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Footer />
    </div>
  )
}

export default Description

