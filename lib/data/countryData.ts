export interface CountryDefinitions {
  kurumsal?: string;
  bilimsel?: string;
  kulturel?: string;
}

export interface CountryInfo {
  name: string;
  localTerm: string;
  coordinates: [number, number];
  countryCode: string;
  definitions: CountryDefinitions;
}

export type FilterType = 'all' | 'kurumsal' | 'bilimsel' | 'kulturel';

export const countryData: Record<string, CountryInfo> = {
  JP: {
    name: "Japonya",
    localTerm: "災害 (Saigai)",
    coordinates: [36.2048, 138.2529],
    countryCode: "jp",
    definitions: {
      kurumsal:
        "Japonya Afetle Mücadele Temel Yasası'na göre afet, 'anormal derecede şiddetli doğa olaylarının (deprem, tayfun, tsunami vb.) neden olduğu hasar' olarak tanımlanır. (UNDRR ile uyumlu)",
      bilimsel:
        "Mühendislik bakış açısıyla 'Saigai', sismik ve hidrolojik tehlikelerin, yoğun kentsel altyapı (maruziyet) üzerindeki fiziksel etkileri ve yapısal başarısızlıkları ifade eder.",
      kulturel:
        "Kültürel olarak afetler, 'Shikata ga nai' (kaçınılmazlık) felsefesi ve doğanın kontrol edilemez gücüne duyulan (bazen ilahi bir güç olarak) saygı ile çerçevelenir.",
    },
  },
  TR: {
    name: "Türkiye",
    localTerm: "Afet",
    coordinates: [38.9637, 35.2433],
    countryCode: "tr",
    definitions: {
      kurumsal:
        "7269 sayılı kanuna göre afet; 'toplumun tamamı veya belli kesimleri için fiziksel, ekonomik ve sosyal kayıplar doğuran, normal hayatı ve insan faaliyetlerini durduran veya kesintiye uğratan doğal, teknolojik veya insan kökenli olaylar' olarak tanımlanır. (AFAD tanımı)",
      bilimsel:
        "Sosyolojik olarak afet, tehlikenin kendisi değil, toplumsal düzenin ve başa çıkma kapasitesinin çökmesidir. Mühendislik açısından ise öncelikle sismik tehlikelere ve yapı stoğunun kırılganlığına odaklanılır.",
    },
  },
  BO: {
    name: "Bolivya",
    localTerm: "Desastre / Pachamama'nın Uyarısı",
    coordinates: [-16.5000, -68.1500],
    countryCode: "bo",
    definitions: {
      kurumsal:
        "Bolivya'nın sivil savunma (Defensa Civil) tanımı, ağırlıklı olarak toplumsal kapasiteyi aşan hidrolojik (sel) ve jeofiziksel (heyelan) olayların olumsuz etkilerine odaklanır.",
      kulturel:
        "Quechua ve Aymara toplulukları için afet (kuraklık veya sel), genellikle 'Pachamama' (Toprak Ana) ile topluluk arasındaki sosyal, manevi ve ekolojik dengenin bozulmasının bir sonucu veya uyarısı olarak yorumlanır.",
    },
  },
  US: {
    name: "ABD",
    localTerm: "Disaster",
    coordinates: [37.0902, -95.7129],
    countryCode: "us",
    definitions: {
      kurumsal:
        "Stafford Yasası (FEMA) tanımına göre 'afet', eyalet ve yerel yönetimlerin başa çıkma kapasitesini aşan, federal yardım gerektiren 'herhangi bir doğal felaket (kasırga, tsunami, deprem dahil) veya nedeni ne olursa olsun yangın, sel veya patlama' olayıdır.",
      bilimsel:
        "Sosyolojik olarak (örn: Felaket Araştırma Merkezi - DRC), afetler 'olay'dan ziyade 'sosyal bir süreç' olarak görülür; toplulukların kırılganlıklarını ve uyum sağlama biçimlerini ortaya çıkarır.",
    },
  },
};
