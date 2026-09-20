// data/mockProducts.ts
import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Βιολογικές Ντομάτες Κρήτης',
    description: 'Παραδοσιακή ποικιλία με πλούσιο άρωμα, καλλιεργημένη χωρίς χημικά λιπάσματα. Συλλέγεται καθημερινά την αυγή.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    season: 'summer',
    category: 'Λαχανικά',
  },
  {
    id: 'p2',
    title: 'Φρέσκα Κολοκυθάκια',
    description: 'Τρυφερά κολοκυθάκια παραγωγής μας, ιδανικά για σαλάτες, ψητά ή παραδοσιακούς κολοκυθοκεφτέδες.',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    season: 'summer',
    category: 'Λαχανικά',
  },
  {
    id: 'p3',
    title: 'Βιολογικά Σύκα Μαρκόπουλου',
    description: 'Γλυκά και ζουμερά σύκα απευθείας από τα δέντρα μας. Διαθέσιμα μόνο κατά τη διάρκεια της θερινής συγκομιδής.',
    imageUrl: 'https://images.unsplash.com/photo-1601379324928-d22504c5d2b7?auto=format&fit=crop&w=800&q=80',
    isAvailable: false,
    season: 'summer',
    category: 'Φρούτα',
  },
];