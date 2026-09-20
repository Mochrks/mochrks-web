export interface BehanceCard {
  id: number;
  title: string;
  src: string;
  author: string;
  likes: number;
  views: number;
  category: string;
  description: string;
}

export interface BehanceCardProps {
  card: BehanceCard;
  onCardClick: () => void;
  onLike: (cardId: number, e: React.MouseEvent) => void;
  isLiked: boolean;
  currentLikes: number;
}

export interface BehanceModalProps {
  card: BehanceCard;
  onClose: () => void;
  onLike: (cardId: number, e: React.MouseEvent) => void;
  isLiked: boolean;
  currentLikes: number;
}
