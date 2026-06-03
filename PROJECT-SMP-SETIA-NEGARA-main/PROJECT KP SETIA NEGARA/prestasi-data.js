(function () {
    const STORAGE_KEY = "smp-setia-negara-prestasi";
    const DEFAULT_PHOTO = "asset/image/ICON.jpg";

    const defaultAchievements = [
        {
            id: "prestasi-1",
            tahun: "2025",
            judul: "Juara 1 Olimpiade Matematika Nasional",
            tingkat: "Nasional",
            deskripsi: "Berhasil meraih juara pertama tingkat nasional dalam kompetisi matematika antar SMP.",
            foto: DEFAULT_PHOTO
        },
        {
            id: "prestasi-2",
            tahun: "2024",
            judul: "Juara Futsal Antar Sekolah",
            tingkat: "Kota",
            deskripsi: "Tim futsal SMP Setia Negara memenangkan turnamen futsal tingkat kota Depok.",
            foto: DEFAULT_PHOTO
        },
        {
            id: "prestasi-3",
            tahun: "2023",
            judul: "Best Science Project Award",
            tingkat: "Nasional",
            deskripsi: "Meraih penghargaan proyek sains terbaik dalam pameran pendidikan nasional.",
            foto: DEFAULT_PHOTO
        },
        {
            id: "prestasi-4",
            tahun: "2022",
            judul: "Juara 2 Lomba Pidato Bahasa Inggris",
            tingkat: "Provinsi",
            deskripsi: "Siswa kami berhasil menjadi runner-up dalam lomba speech competition provinsi.",
            foto: DEFAULT_PHOTO
        }
    ];

    function safeRead() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved) && saved.length ? saved : defaultAchievements;
        } catch (error) {
            return defaultAchievements;
        }
    }

    function save(achievements) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
    }

    function makeId(title) {
        const slug = String(title || "prestasi").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return `${slug || "prestasi"}-${Date.now()}`;
    }

    function assetPath(path) {
        if (!path) return "";
        if (path.startsWith("data:") || path.startsWith("http") || path.startsWith("/")) return path;

        const normalized = location.pathname.toLowerCase();
        if (normalized.endsWith("/dashboard.html") || normalized.endsWith("\\dashboard.html")) {
            return `PROJECT KP SETIA NEGARA/${path}`;
        }
        if (normalized.includes("/page/") || normalized.includes("\\page\\")) {
            return `../${path}`;
        }
        return path;
    }

    function sortAchievements(achievements) {
        return [...achievements].sort((a, b) => Number(b.tahun || 0) - Number(a.tahun || 0));
    }

    function getAchievements() {
        return sortAchievements(safeRead());
    }

    function getAchievement(id) {
        return getAchievements().find((achievement) => achievement.id === id);
    }

    function addAchievement(data) {
        const achievements = safeRead();
        const achievement = { ...data, id: makeId(data.judul), foto: data.foto || DEFAULT_PHOTO };
        achievements.push(achievement);
        save(achievements);
        return achievement;
    }

    function updateAchievement(id, data) {
        const achievements = safeRead().map((achievement) => achievement.id === id ? { ...achievement, ...data, id } : achievement);
        save(achievements);
    }

    function deleteAchievement(id) {
        save(safeRead().filter((achievement) => achievement.id !== id));
    }

    function renderPrestasiPage() {
        const timeline = document.querySelector(".prestasi-timeline");
        if (!timeline) return;

        const achievements = getAchievements();
        if (!achievements.length) {
            timeline.innerHTML = '<div class="prestasi-content"><h3>Belum ada prestasi</h3><p>Data prestasi akan tampil setelah ditambahkan dari dashboard.</p></div>';
            return;
        }

        timeline.innerHTML = achievements.map((achievement) => `
            <div class="prestasi-item reveal">
                <div class="prestasi-year">${achievement.tahun || "-"}</div>
                <div class="prestasi-content">
                    <img src="${assetPath(achievement.foto)}" alt="${achievement.judul}">
                    <h3>${achievement.judul}</h3>
                    <p>${achievement.deskripsi || achievement.tingkat || "-"}</p>
                </div>
            </div>
        `).join("");
    }

    window.PrestasiData = {
        DEFAULT_PHOTO,
        getAchievements,
        getAchievement,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        assetPath,
        renderPrestasiPage
    };
})();
