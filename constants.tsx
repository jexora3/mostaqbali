
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

export const GET_SUBJECTS_FOR_GRADE = (gradeId: string) => {
  // Primary 1-4
  if (['p1', 'p2', 'p3', 'p4'].includes(gradeId)) {
    return [
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'النشاط العلمي', icon: 'fa-solid fa-flask' },
      { name: 'التربية التشكيلية / الفنية', icon: 'fa-solid fa-palette' },
      { name: 'التربية البدنية', icon: 'fa-solid fa-running' }
    ];
  }
  // Primary 5-6
  if (['p5', 'p6'].includes(gradeId)) {
    return [
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'النشاط العلمي', icon: 'fa-solid fa-flask' },
      { name: 'الاجتماعيات', icon: 'fa-solid fa-map' },
      { name: 'التربية التشكيلية / الفنية', icon: 'fa-solid fa-palette' },
      { name: 'التربية البدنية', icon: 'fa-solid fa-running' }
    ];
  }
  // Middle School
  if (['m1', 'm2', 'm3'].includes(gradeId)) {
    return [
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'الفيزياء والكيمياء', icon: 'fa-solid fa-bolt-lightning' },
      { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-leaf' },
      { name: 'الاجتماعيات', icon: 'fa-solid fa-map' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'التكنولوجيا الصناعية', icon: 'fa-solid fa-gears' },
      { name: 'المعلوميات', icon: 'fa-solid fa-laptop' }
    ];
  }
  // High School - Common Core Science
  if (gradeId === 'h1_sci') {
    return [
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'الفيزياء والكيمياء', icon: 'fa-solid fa-bolt-lightning' },
      { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-dna' },
      { name: 'الاجتماعيات', icon: 'fa-solid fa-map' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
      { name: 'المعلوميات', icon: 'fa-solid fa-laptop' },
      { name: 'التربية البدنية', icon: 'fa-solid fa-running' }
    ];
  }
  // High School - Common Core Tech
  if (gradeId === 'h1_tech') {
    return [
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'الفيزياء والكيمياء', icon: 'fa-solid fa-bolt-lightning' },
      { name: 'علوم المهندس', icon: 'fa-solid fa-microchip' },
      { name: 'المعلوميات', icon: 'fa-solid fa-laptop' },
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'التاريخ والجغرافيا', icon: 'fa-solid fa-map' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' }
    ];
  }
  // High School - Common Core Arts
  if (gradeId === 'h1_art') {
    return [
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'التاريخ والجغرافيا', icon: 'fa-solid fa-map' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-dna' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'المعلوميات', icon: 'fa-solid fa-laptop' },
      { name: 'الثقافة الفنية', icon: 'fa-solid fa-palette' }
    ];
  }
  // Bac 1 - Math Science
  if (gradeId === 'h2_math') {
    return [
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'الفيزياء والكيمياء', icon: 'fa-solid fa-bolt-lightning' },
      { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-dna' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'التاريخ والجغرافيا', icon: 'fa-solid fa-map' }
    ];
  }
  // Bac 1 - Experimental Science
  if (gradeId === 'h2_exp') {
    return [
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'الفيزياء والكيمياء', icon: 'fa-solid fa-bolt-lightning' },
      { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-dna' },
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
      { name: 'التاريخ والجغرافيا', icon: 'fa-solid fa-map' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' }
    ];
  }
  // Bac 1 - Arts
  if (gradeId === 'h2_art') {
    return [
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'التاريخ والجغرافيا', icon: 'fa-solid fa-map' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-dna' },
      { name: 'الثقافة الفنية', icon: 'fa-solid fa-palette' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' }
    ];
  }
  // Bac 2 - Physics Science
  if (gradeId === 'h3_phys') {
    return [
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'الفيزياء والكيمياء', icon: 'fa-solid fa-bolt-lightning' },
      { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-dna' },
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'التاريخ والجغرافيا', icon: 'fa-solid fa-map' }
    ];
  }
  // Bac 2 - SVT
  if (gradeId === 'h3_svt') {
    return [
      { name: 'علوم الحياة والأرض', icon: 'fa-solid fa-dna' },
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'الفيزياء والكيمياء', icon: 'fa-solid fa-bolt-lightning' },
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'الترجمة', icon: 'fa-solid fa-language' }
    ];
  }
  // Bac 2 - Economy
  if (gradeId === 'h3_eco') {
    return [
      { name: 'الاقتصاد العام والإحصاء', icon: 'fa-solid fa-chart-pie' },
      { name: 'المحاسبة والرياضيات المالية', icon: 'fa-solid fa-file-invoice-dollar' },
      { name: 'الاقتصاد والتنظيم الإداري', icon: 'fa-solid fa-sitemap' },
      { name: 'الرياضيات', icon: 'fa-solid fa-calculator' },
      { name: 'القانون', icon: 'fa-solid fa-scale-balanced' },
      { name: 'معلوميات التدبير', icon: 'fa-solid fa-database' },
      { name: 'الفلسفة', icon: 'fa-solid fa-lightbulb' },
      { name: 'اللغة الإنجليزية', icon: 'fa-solid fa-globe' },
      { name: 'اللغة العربية', icon: 'fa-solid fa-language' },
      { name: 'اللغة الفرنسية', icon: 'fa-solid fa-font' },
      { name: 'التربية الإسلامية', icon: 'fa-solid fa-mosque' },
      { name: 'التاريخ والجغرافيا', icon: 'fa-solid fa-map' }
    ];
  }

  return [];
};

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
