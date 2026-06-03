(function () {
    const STORAGE_KEY = "smp-setia-negara-konten";
    const DEFAULT_PHOTO = "asset/image/ICON.jpg";

    const defaultItems = [
        { id: "fasilitas-lab-komputer", kategori: "fasilitas", nama: "Lab Komputer", deskripsi: "Fasilitas komputer modern untuk menunjang pembelajaran teknologi dan digital.", icon: "fas fa-desktop", foto: DEFAULT_PHOTO, link: "fasilitas/labkom.html" },
        { id: "fasilitas-lab-ipa", kategori: "fasilitas", nama: "Lab IPA", deskripsi: "Laboratorium lengkap untuk praktik sains dan eksperimen siswa.", icon: "fas fa-flask", foto: DEFAULT_PHOTO, link: "fasilitas/labipa.html" },
        { id: "fasilitas-perpustakaan", kategori: "fasilitas", nama: "Perpustakaan", deskripsi: "Koleksi buku edukatif lengkap untuk menambah wawasan dan literasi siswa.", icon: "fas fa-book-open", foto: DEFAULT_PHOTO, link: "fasilitas/perpustakaan.html" },
        { id: "fasilitas-mushola", kategori: "fasilitas", nama: "Mushola", deskripsi: "Tempat ibadah yang nyaman bagi warga sekolah untuk melaksanakan kegiatan keagamaan.", icon: "fas fa-mosque", foto: DEFAULT_PHOTO, link: "fasilitas/musholah.html" },
        { id: "fasilitas-ruang-galeri", kategori: "fasilitas", nama: "Ruang Galeri", deskripsi: "Ruang khusus untuk memamerkan karya seni, kreativitas, dan hasil karya siswa.", icon: "fas fa-image", foto: DEFAULT_PHOTO, link: "fasilitas/galeri.html" },
        { id: "fasilitas-lapangan", kategori: "fasilitas", nama: "Lapangan", deskripsi: "Area olahraga untuk menunjang kegiatan fisik dan ekstrakurikuler siswa.", icon: "fas fa-futbol", foto: DEFAULT_PHOTO, link: "fasilitas/lapangan.html" },
        { id: "fasilitas-ruang-kelas", kategori: "fasilitas", nama: "Ruang Kelas", deskripsi: "Ruang belajar nyaman untuk mendukung proses pembelajaran siswa.", icon: "fas fa-school", foto: DEFAULT_PHOTO, link: "fasilitas/ruangkelas.html" },

        { id: "ekskul-pramuka", kategori: "ekskul", nama: "Pramuka", deskripsi: "Menanamkan rasa cinta tanah air dan jiwa patriotisme.", icon: "fas fa-fire", foto: DEFAULT_PHOTO, link: "ekskul/Pramuka.html" },
        { id: "ekskul-paskibra", kategori: "ekskul", nama: "Paskibra", deskripsi: "Meningkatkan kedisiplinan serta membangkitkan jiwa nasionalisme.", icon: "fas fa-flag", foto: DEFAULT_PHOTO, link: "ekskul/Paskibra.html" },
        { id: "ekskul-paduan-suara", kategori: "ekskul", nama: "Paduan Suara", deskripsi: "Meningkatkan minat dan bakat siswa di bidang seni musik dan vokal.", icon: "fas fa-microphone", foto: DEFAULT_PHOTO, link: "ekskul/PanduanSuara.html" },
        { id: "ekskul-taekwondo", kategori: "ekskul", nama: "Taekwondo", deskripsi: "Meningkatkan percaya diri, kebugaran, dan prestasi olahraga.", icon: "fas fa-fist-raised", foto: DEFAULT_PHOTO, link: "ekskul/Taekwondo.html" },
        { id: "ekskul-tari-saman", kategori: "ekskul", nama: "Tari Saman", deskripsi: "Mengembangkan bakat seni tari dan kekompakan tim.", icon: "fas fa-people-group", foto: DEFAULT_PHOTO, link: "ekskul/TariSaman.html" },
        { id: "ekskul-basket", kategori: "ekskul", nama: "Basket", deskripsi: "Melatih kerja sama tim, disiplin, dan sportivitas.", icon: "fas fa-basketball-ball", foto: DEFAULT_PHOTO, link: "ekskul/Basket.html" },
        { id: "ekskul-english-club", kategori: "ekskul", nama: "English Club", deskripsi: "Meningkatkan kemampuan berbicara dan kepercayaan diri dalam bahasa Inggris.", icon: "fas fa-language", foto: DEFAULT_PHOTO, link: "ekskul/EnglishClub.html" },
        { id: "ekskul-badminton", kategori: "ekskul", nama: "Badminton", deskripsi: "Mengembangkan kemampuan olahraga dan mencari bibit atlet berbakat.", icon: "fas fa-table-tennis", foto: DEFAULT_PHOTO, link: "ekskul/Badminton.html" },
        { id: "ekskul-futsal", kategori: "ekskul", nama: "Futsal", deskripsi: "Memberikan ruang bagi siswa untuk berlatih dan mengembangkan minat di bidang futsal.", icon: "fas fa-futbol", foto: DEFAULT_PHOTO, link: "ekskul/Futsal.html" },
        { id: "ekskul-pmr", kategori: "ekskul", nama: "PMR", deskripsi: "Membekali siswa dengan kemampuan pertolongan pertama dan kepedulian sosial.", icon: "fas fa-kit-medical", foto: DEFAULT_PHOTO, link: "ekskul/PMR.html" },

        { id: "unggulan-akreditasi-a", kategori: "unggulan", nama: "Akreditasi A", deskripsi: "Sekolah terakreditasi dengan mutu pembelajaran yang baik.", icon: "fas fa-star", foto: "asset/image/ICON.jpg", link: "" },
        { id: "unggulan-shalat-dzuhur", kategori: "unggulan", nama: "Shalat Dzuhur", deskripsi: "Pembiasaan ibadah untuk membangun karakter religius siswa.", icon: "fas fa-mosque", foto: "asset/image/ICON.jpg", link: "" },
        { id: "unggulan-literasi", kategori: "unggulan", nama: "Literasi", deskripsi: "Program membaca dan menulis untuk memperkuat wawasan siswa.", icon: "fas fa-book", foto: "asset/image/ICON.jpg", link: "" },
        { id: "unggulan-murojaah", kategori: "unggulan", nama: "Muroja'ah", deskripsi: "Kegiatan pembiasaan mengulang hafalan Al-Qur'an.", icon: "fas fa-quran", foto: "asset/image/ICON.jpg", link: "" },
        { id: "unggulan-tahfiz", kategori: "unggulan", nama: "Tahfiz", deskripsi: "Program menghafal Al-Qur'an untuk siswa.", icon: "fas fa-book-open", foto: "asset/image/ICON.jpg", link: "" },
        { id: "unggulan-study-tour", kategori: "unggulan", nama: "Study Tour", deskripsi: "Kegiatan belajar luar kelas yang memperkaya pengalaman siswa.", icon: "fas fa-bus", foto: "asset/image/ICON.jpg", link: "" },
        { id: "unggulan-ldks", kategori: "unggulan", nama: "LDKS", deskripsi: "Latihan dasar kepemimpinan untuk membentuk karakter pemimpin.", icon: "fas fa-users", foto: "asset/image/ICON.jpg", link: "" }
    ];

    function safeRead() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved) && saved.length ? saved : defaultItems;
        } catch (error) {
            return defaultItems;
        }
    }

    function save(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }

    function makeId(category, name) {
        const slug = String(name || "konten").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return `${category || "konten"}-${slug || "item"}-${Date.now()}`;
    }

    function assetPath(path) {
        if (!path) return "";
        if (path.startsWith("data:") || path.startsWith("http") || path.startsWith("/")) return path;
        const normalized = location.pathname.toLowerCase();
        if (normalized.endsWith("/dashboard.html") || normalized.endsWith("\\dashboard.html")) return `PROJECT KP SETIA NEGARA/${path}`;
        if (normalized.includes("/page/") || normalized.includes("\\page\\")) return `../${path}`;
        return path;
    }

    function getItems(category) {
        const items = safeRead();
        return category ? items.filter((item) => item.kategori === category) : items;
    }

    function getItem(id) {
        return safeRead().find((item) => item.id === id);
    }

    function addItem(data) {
        const items = safeRead();
        const item = { ...data, id: makeId(data.kategori, data.nama), foto: data.foto || DEFAULT_PHOTO };
        items.push(item);
        save(items);
        return item;
    }

    function updateItem(id, data) {
        save(safeRead().map((item) => item.id === id ? { ...item, ...data, id } : item));
    }

    function deleteItem(id) {
        save(safeRead().filter((item) => item.id !== id));
    }

    function renderFasilitasPage() {
        const wrapper = document.querySelector(".fasilitas-wrapper");
        if (!wrapper) return;
        const items = getItems("fasilitas");
        wrapper.innerHTML = items.map((item) => `
            <a href="${item.link || "javascript:void(0)"}" class="fasilitas-box reveal">
                <i class="${item.icon || "fas fa-school"}"></i>
                <h3>${item.nama}</h3>
                <p>${item.deskripsi || "-"}</p>
            </a>
        `).join("");
    }

    function renderEkskulPage() {
        const grid = document.querySelector(".ekskul-grid");
        if (!grid) return;
        const items = getItems("ekskul");
        grid.innerHTML = items.map((item) => `
            <a href="${item.link || "javascript:void(0)"}" class="ekskul-card reveal">
                <i class="${item.icon || "fas fa-star"}"></i>
                <h3>${item.nama}</h3>
                <p>${item.deskripsi || "-"}</p>
            </a>
        `).join("");
    }

    function renderUnggulanPage() {
        const grid = document.querySelector(".keunggulan-grid");
        if (!grid) return;
        const items = getItems("unggulan");
        grid.innerHTML = items.map((item) => `
            <div class="keunggulan-card">
                <img src="${assetPath(item.foto)}" alt="${item.nama}">
                <h3>${item.nama}</h3>
            </div>
        `).join("");
    }

    function renderPages() {
        renderFasilitasPage();
        renderEkskulPage();
        renderUnggulanPage();
    }

    window.KontenData = {
        DEFAULT_PHOTO,
        getItems,
        getItem,
        addItem,
        updateItem,
        deleteItem,
        assetPath,
        renderPages
    };
})();
