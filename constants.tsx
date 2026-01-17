
import { Level, Grade } from './types';

export const GRADES: Grade[] = [
  // Primary
  { id: 'p1', name: 'الأول ابتدائي', level: Level.PRIMARY, icon: 'fa-solid fa-star' },
  { id: 'p2', name: 'الثاني ابتدائي', level: Level.PRIMARY, icon: 'fa-solid fa-pencil' },
  { id: 'p3', name: 'الثالث ابتدائي', level: Level.PRIMARY, icon: 'fa-solid fa-book' },
  { id: 'p4', name: 'الرابع ابتدائي', level: Level.PRIMARY, icon: 'fa-solid fa-shapes' },
  { id: 'p5', name: 'الخامس ابتدائي', level: Level.PRIMARY, icon: 'fa-solid fa-microscope' },
  { id: 'p6', name: 'السادس ابتدائي', level: Level.PRIMARY, icon: 'fa-solid fa-graduation-cap' },
  
  // Middle School
  { id: 'm1', name: 'الأولى إعدادي', level: Level.MIDDLE, icon: 'fa-solid fa-user-graduate' },
  { id: 'm2', name: 'الثانية إعدادي', level: Level.MIDDLE, icon: 'fa-solid fa-brain' },
  { id: 'm3', name: 'الثالثة إعدادي', level: Level.MIDDLE, icon: 'fa-solid fa-award' },
  
  // High School
  { id: 'h1_sci', name: 'جذع مشترك علمي', level: Level.HIGH, icon: 'fa-solid fa-flask-vial' },
  { id: 'h1_tech', name: 'جذع مشترك تكنولوجي', level: Level.HIGH, icon: 'fa-solid fa-laptop-code' },
  { id: 'h1_art', name: 'جذع مشترك آداب', level: Level.HIGH, icon: 'fa-solid fa-pen-fancy' },
  { id: 'h2_math', name: '1 بكالوريا ع. رياضية', level: Level.HIGH, icon: 'fa-solid fa-compass-drafting' },
  { id: 'h2_exp', name: '1 بكالوريا ع. تجريبية', level: Level.HIGH, icon: 'fa-solid fa-vial' },
  { id: 'h2_art', name: '1 بكالوريا آداب', level: Level.HIGH, icon: 'fa-solid fa-book-open-reader' },
  { id: 'h3_phys', name: '2 بكالوريا ع. فيزيائية', level: Level.HIGH, icon: 'fa-solid fa-atom' },
  { id: 'h3_svt', name: '2 بكالوريا ع. الحياة والأرض', level: Level.HIGH, icon: 'fa-solid fa-dna' },
  { id: 'h3_eco', name: '2 بكالوريا ع. اقتصادية', level: Level.HIGH, icon: 'fa-solid fa-chart-line' },
];

export const SUBJECTS = [
  { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
  { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
  { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
  { name: 'الفيزياء والكيمياء', icon: 'fa-solid fa-bolt-lightning' },
  { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-leaf' },
  { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
  { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
  { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' }
];
