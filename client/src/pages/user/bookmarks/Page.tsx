import React, { Fragment } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Bookmark, ExternalLink } from 'lucide-react';
import Nav from '@/components/layout/Nav';
import { bookmarkData } from '@/global/dummy-data';

interface BookmarkedDomain {
  id: string;
  name: string;
  description: string | null;
  stipend: boolean;
  stipendAmount: number | null;
  company: {
    name: string;
    logo: string | null;
  };
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = React.useState<BookmarkedDomain[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // fetchBookmarks();
    setBookmarks(bookmarkData as BookmarkedDomain[])
  }, []);

  const fetchBookmarks = async () => {
    try {
      // Fetch bookmarks logic here
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      setIsLoading(false);
    }
  };

  const removeBookmark = async (domainId: string) => {
    try {
      // Remove bookmark logic here
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== domainId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  if (isLoading) {
    return (
        <Fragment>
            <Nav />
            <main className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </main>  
        </Fragment>
    );
  }

  return (
    <Fragment>
        <Nav />
        <main className="container py-8 px-4 lg:px-16">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5" />
                    Saved Domains
                </CardTitle>
                </CardHeader>
                <CardContent>
                {bookmarks.length === 0 ? (
                    <div className="text-center py-8">
                    <p className="text-muted-foreground">No bookmarks yet</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bookmarks.map((domain) => (
                        <Card key={domain.id}>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                {domain.company.logo && (
                                <img
                                    src={domain.company.logo}
                                    alt={domain.company.name}
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                )}
                                <div>
                                <h3 className="font-medium">{domain.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {domain.company.name}
                                </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeBookmark(domain.id)}
                            >
                                <Bookmark className="h-4 w-4 fill-current" />
                            </Button>
                            </div>

                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {domain.description}
                            </p>

                            {domain.stipend && (
                            <p className="mt-2 text-sm text-green-600">
                                Stipend: {domain.stipendAmount ? `₹${domain.stipendAmount}` : 'Available'}
                            </p>
                            )}

                            <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 w-full"
                            >
                            View Details
                            <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                )}
                </CardContent>
            </Card>
        </main>
    </Fragment>
    
  );
}