
document.addEventListener('DOMContentLoaded', () => {

    // 1. Veri Kaynağı (Planımıza uygun olarak)
    // Ülke ID'leri (JP, TR, BO, US) HTML'deki SVG path ID'leri ile eşleşmelidir.
    const countryData = {
        "JP": {
            name: "Japonya",
            localTerm: "災害 (Saigai)",
            definitions: {
                kurumsal: "Japonya Afetle Mücadele Temel Yasası'na göre afet, 'anormal derecede şiddetli doğa olaylarının (deprem, tayfun, tsunami vb.) neden olduğu hasar' olarak tanımlanır. (UNDRR ile uyumlu)",
                bilimsel: "Mühendislik bakış açısıyla 'Saigai', sismik ve hidrolojik tehlikelerin, yoğun kentsel altyapı (maruziyet) üzerindeki fiziksel etkileri ve yapısal başarısızlıkları ifade eder.",
                kulturel: "Kültürel olarak afetler, 'Shikata ga nai' (kaçınılmazlık) felsefesi ve doğanın kontrol edilemez gücüne duyulan (bazen ilahi bir güç olarak) saygı ile çerçevelenir."
            }
        },
        "TR": {
            name: "Türkiye",
            localTerm: "Afet",
            definitions: {
                kurumsal: "7269 sayılı kanuna göre afet; 'toplumun tamamı veya belli kesimleri için fiziksel, ekonomik ve sosyal kayıplar doğuran, normal hayatı ve insan faaliyetlerini durduran veya kesintiye uğratan doğal, teknolojik veya insan kökenli olaylar' olarak tanımlanır. (AFAD tanımı)",
                bilimsel: "Sosyolojik olarak afet, tehlikenin kendisi değil, toplumsal düzenin ve başa çıkma kapasitesinin çökmesidir. Mühendislik açısından ise öncelikle sismik tehlikelere ve yapı stoğunun kırılganlığına odaklanılır.",
                kulturel: "(Veri Yok)" // Boş veri örneği
            }
        },
        "BO": {
            name: "Bolivya",
            localTerm: "Desastre / Pachamama'nın Uyarısı",
            definitions: {
                kurumsal: "Bolivya'nın sivil savunma (Defensa Civil) tanımı, ağırlıklı olarak toplumsal kapasiteyi aşan hidrolojik (sel) ve jeofiziksel (heyelan) olayların olumsuz etkilerine odaklanır.",
                bilimsel: "(Veri Yok)",
                kulturel: "Quechua ve Aymara toplulukları için afet (kuraklık veya sel), genellikle 'Pachamama' (Toprak Ana) ile topluluk arasındaki sosyal, manevi ve ekolojik dengenin bozulmasının bir sonucu veya uyarısı olarak yorumlanır."
            }
        },
        "US": {
            name: "ABD",
            localTerm: "Disaster",
            definitions: {
                kurumsal: "Stafford Yasası (FEMA) tanımına göre 'afet', eyalet ve yerel yönetimlerin başa çıkma kapasitesini aşan, federal yardım gerektiren 'herhangi bir doğal felaket (kasırga, tsunami, deprem dahil) veya nedeni ne olursa olsun yangın, sel veya patlama' olayıdır.",
                bilimsel: "Sosyolojik olarak (örn: Felaket Araştırma Merkezi - DRC), afetler 'olay'dan ziyade 'sosyal bir süreç' olarak görülür; toplulukların kırılganlıklarını ve uyum sağlama biçimlerini ortaya çıkarır.",
                kulturel: "(Veri Yok)"
            }
        }
    };

    // 2. DOM Elemanlarını Seçme
    const modal = document.getElementById('definition-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalLocalTerm = document.getElementById('modal-local-term');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalDefinitions = document.getElementById('modal-definitions');
    
    const clickableCountries = document.querySelectorAll('.world-map .clickable');
    const filters = document.querySelectorAll('.filter-controls input[name="filter"]');
    const allCountryPaths = document.querySelectorAll('.world-map .country');

    // 3. Olay Dinleyicileri (Event Listeners)

    // Ülkelere tıklama olayı
    clickableCountries.forEach(country => {
        country.addEventListener('click', () => {
            const countryId = country.id;
            openModal(countryId);
        });
    });

    // Modal kapatma olayı
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(); // Dışarıya tıklayınca kapat
        }
    });

    // Filtreleme olayı
    filters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            applyFilter(e.target.value);
        });
    });

    // 4. Fonksiyonlar

    // Modal'ı açan ve veriyi dolduran fonksiyon
    function openModal(countryId) {
        const data = countryData[countryId];
        if (!data) return;

        modalTitle.textContent = data.name;
        modalLocalTerm.textContent = `Yerel Terim: ${data.localTerm}`;

        // Sekmeleri ve içeriklerini temizle/doldur
        setupTabs(data.definitions);

        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // Modal içindeki sekmeleri yöneten fonksiyon
    function setupTabs(definitions) {
        const tabLinks = modal.querySelectorAll('.tab-link');
        const tabContents = modal.querySelectorAll('.tab-content');

        tabLinks.forEach(link => {
            const tabId = link.getAttribute('data-tab'); // kurumsal, bilimsel, kulturel
            const contentDiv = modal.querySelector(`#tab-${tabId}`);
            
            if (definitions[tabId] && definitions[tabId] !== "(Veri Yok)") {
                contentDiv.textContent = definitions[tabId];
                contentDiv.setAttribute('data-isempty', 'false');
                link.style.display = 'inline-block'; // Sekmeyi göster
            } else {
                contentDiv.textContent = 'Bu çerçeve için veri bulunamadı.';
                contentDiv.setAttribute('data-isempty', 'true');
                link.style.display = 'none'; // Veri yoksa sekmeyi gizle
            }

            // Sekme tıklama olayı
            link.onclick = () => {
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                link.classList.add('active');
                contentDiv.classList.add('active');
            };
        });

        // Varsayılan olarak ilk *görünür* sekmeyi aktif et
        const firstVisibleTab = modal.querySelector('.tab-link[style*="inline-block"]');
        if(firstVisibleTab) {
            firstVisibleTab.click();
        }
    }
    
    // Harita filtreleme fonksiyonu
    function applyFilter(filterValue) {
        allCountryPaths.forEach(path => {
            // Tüm vurguları ve karartmayı temizle
            path.classList.remove('highlight-kurumsal', 'highlight-bilimsel', 'highlight-kulturel', 'dimmed');

            if (filterValue === 'all') {
                return; // Tümü seçiliyse hiçbir şey yapma
            }

            // Tıklanabilir bir ülke mi?
            if (path.classList.contains('clickable')) {
                const countryId = path.id;
                const data = countryData[countryId];
                
                // Veri setinde bu filtreye ait tanım var mı?
                if (data && data.definitions[filterValue] && data.definitions[filterValue] !== "(Veri Yok)") {
                    path.classList.add(`highlight-${filterValue}`);
                } else {
                    path.classList.add('dimmed'); // Bu filtreye uymuyorsa karart
                }
            } else {
                // Tıklanabilir olmayan diğer tüm ülkeleri karart
                path.classList.add('dimmed');
            }
        });
    }
});
