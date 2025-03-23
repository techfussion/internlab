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
import { REACT_APP_API_BASE } from '@/global/constants';
import { toast } from '@/hooks/use-toast';
import apiClient from '@/interceptor/axios.interceptor';

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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to view your bookmarks.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const response = await apiClient.get(`${REACT_APP_API_BASE }/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookmarks(response.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch bookmarks. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeBookmark = async (domainId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to remove bookmarks.',
          variant: 'destructive',
        });
        return;
      }

      await apiClient.delete(`${REACT_APP_API_BASE }/bookmarks/${domainId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== domainId));

      toast({
        title: 'Bookmark Removed',
        description: 'Successfully removed the bookmark.',
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove bookmark. Please try again later.',
        variant: 'destructive',
      });
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

                      <Button variant="outline" size="sm" className="mt-4 w-full">
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
