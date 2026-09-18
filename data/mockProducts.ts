// data/mockProducts.ts
import { Product, TimelineItem, FarmerProfile } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ντομάτες Heirloom',
    category: 'leafy',
    price: 4.50,
    unit: 'κιλό',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    isFreshPicked: true,
    description: 'Παραδοσιακές ντομάτες γεμάτες γεύση και άρωμα.'
  },
  {
    id: '2',
    name: 'Βιολογικά Καρότα',
    category: 'root',
    price: 2.80,
    unit: 'κιλό',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    isFreshPicked: true,
    description: 'Γλυκά και τραγανά καρότα κατευθείαν από το χώμα.'
  },
  {
    id: '3',
    name: 'Λαχανίδα Kale',
    category: 'leafy',
    price: 3.20,
    unit: 'ματσάκι',
    imageUrl: 'https://images.unsplash.com/photo-1524179091875-bf98a9a6ae57?auto=format&fit=crop&w=600&q=80',
    isFreshPicked: true,
    description: 'Φρέσκο πράσινο kale πλούσιο σε θρεπτικά συστατικά.'
  },
  {
    id: '4',
    name: 'Χρυσά Τεύτλα',
    category: 'root',
    price: 3.90,
    unit: 'κιλό',
    imageUrl: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=600&q=80',
    isFreshPicked: true,
    description: 'Γλυκιά γεύση με πλούσια γήινη υφή.'
  },
  {
    id: '5',
    name: 'Τραγανά Ραπάνια',
    category: 'root',
    price: 2.10,
    unit: 'ματσάκι',
    imageUrl: 'https://images.unsplash.com/photo-1566842600175-97dca489844f?auto=format&fit=crop&w=600&q=80',
    isFreshPicked: true,
    description: 'Πιπεράτα και φρέσκα ραπάνια πρωινής συγκομιδής.'
  },
  {
    id: '6',
    name: 'Φρέσκα Αυγά Φάρμας',
    category: 'boxes',
    price: 5.50,
    unit: '12άδα',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
    isFreshPicked: true,
    description: 'Αυγά ελευθέρας βοσκής από κότες βιολογικής εκτροφής.'
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: '1954',
    title: 'Ίδρυση',
    description: 'Ο παππούς Γιώργος ξεκινά το πρώτο οικογενειακό θερμοκήπιο με μεράκι και σεβασμό στη γη.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80'
  },
  {
    year: '1982',
    title: 'Μετάβαση σε Βιολογική Καλλιέργεια',
    description: 'Η δεύτερη γενιά καταργεί πλήρως τα χημικά λιπάσματα, στρέφοντας τη παραγωγή σε αμιγώς βιολογικές μεθόδους.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12735?auto=format&fit=crop&w=500&q=80'
  },
  {
    year: '2023',
    title: 'Πρακτικές Αναγεννητικής Γεωργίας',
    description: 'Υιοθετούμε τεχνικές αναγεννητικής γεωργίας για την προστασία του υπεδάφους και τη μείωση του απουπώματος άνθρακα.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=500&q=80'
  }
];

export const FARMER_PROFILES: FarmerProfile[] = [
  {
    id: '1',
    name: 'Μιχάλης Παπαδόπουλος',
    role: 'Υπεύθυνος Καλλιέργειας',
    quote: 'Η γη σου επιστρέφει ακριβώς την αγάπη και τη φροντίδα που της προσφέρεις καθημερινά.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '2',
    name: 'Ελένη Παπαδοπούλου',
    role: 'Διαχείριση Σοδειάς',
    quote: 'Στόχος μας είναι κάθε οικογένεια να λαμβάνει τροφή γεμάτη γεύση και θρεπτική αξία.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '3',
    name: 'Νίκος Παπαδόπουλος',
    role: 'Νέα Γενιά & Καινοτομία',
    quote: 'Συνδυάζουμε την παράδοση τριών γενεών με τις πιο σύγχρονες βιώσιμες τεχνικές.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];