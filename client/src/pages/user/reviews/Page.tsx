import React, { Fragment } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Star,
  StarHalf,
  MessageSquare, 
  Calendar,
  Building2,
  Loader2,
  Pencil,
  Trash2
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Nav from '@/components/layout/Nav';
import { reviewData } from '@/global/dummy-data';

interface Review {
  id: string;
  rating: number;
  comment: string;
  companyId: string;
  company: {
    name: string;
    logo: string | null;
  };
  createdAt: string;
  verified: boolean;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reviewToDelete, setReviewToDelete] = React.useState<string | null>(null);

  React.useEffect(() => {
    // fetchReviews();
    setReviews(reviewData as Review[]);
  }, []);

  const fetchReviews = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/user/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      // Replace with actual API call
      await fetch(`/api/reviews/${reviewToDelete}`, {
        method: 'DELETE',
      });
      setReviews(reviews.filter(review => review.id !== reviewToDelete));
    } catch (error) {
      console.error('Error deleting review:', error);
    } finally {
      setReviewToDelete(null);
    }
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
        <Fragment>
            <Nav />
            <main className="flex items-center justify-center min-h-[400px] px-4 lg:px-16">
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
                    <MessageSquare className="h-5 w-5" />
                    My Reviews
                </CardTitle>
                <CardDescription>
                    Manage your company reviews and ratings
                </CardDescription>
                </CardHeader>
                <CardContent>
                {reviews.length === 0 ? (
                    <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No reviews yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        You haven't written any reviews yet.
                    </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                    {reviews.map((review) => (
                        <Card key={review.id}>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                {review.company.logo ? (
                                <img
                                    src={review.company.logo}
                                    alt={review.company.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                ) : (
                                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-muted-foreground" />
                                </div>
                                )}
                                <div>
                                <h3 className="font-medium">{review.company.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <StarRating rating={review.rating} />
                                    <span className="text-sm text-muted-foreground">
                                    {review.rating.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(review.createdAt).toLocaleDateString()}
                                    {review.verified && (
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                        Verified
                                    </span>
                                    )}
                                </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {/* Handle edit */}}
                                >
                                <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setReviewToDelete(review.id)}
                                >
                                <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            </div>
                            {review.comment && (
                            <p className="mt-4 text-sm">{review.comment}</p>
                            )}
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                )}
                </CardContent>
            </Card>

            <AlertDialog open={!!reviewToDelete} onOpenChange={() => setReviewToDelete(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Review</AlertDialogTitle>
                    <AlertDialogDescription>
                    Are you sure you want to delete this review? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                    onClick={handleDeleteReview}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                    Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    </Fragment>

  );
}