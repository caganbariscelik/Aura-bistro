// app.js

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('menuContainer');
    const nav = document.getElementById('categoryNav');

    let currentLang = 'en';

    // Default mock data (Bilingual)
    const fallbackItems = [
        // Starters / Antipasti
        { 
            category_en: "Starters", 
            category_it: "Antipasti", 
            name_en: "Bluefin Tuna Tartare", 
            name_it: "Tartara di Tonno Rosso", 
            description_en: "Hand-cut tuna, avocado mousse, caper berries, citrus dressing.", 
            description_it: "Tonno tagliato al coltello, mousse di avocado, frutti di cappero, condimento agli agrumi.", 
            price: "€26" 
        },
        { 
            category_en: "Starters", 
            category_it: "Antipasti", 
            name_en: "Heritage Beef Carpaccio", 
            name_it: "Carpaccio di Manzo Heritage", 
            description_en: "Thinly sliced wagyu beef, 36-month aged Parmigiano, truffle pearls.", 
            description_it: "Sottili fette di manzo wagyu, Parmigiano invecchiato 36 mesi, perle di tartufo.", 
            price: "€28" 
        },
        { 
            category_en: "Starters", 
            category_it: "Antipasti", 
            name_en: "Wild Mushroom Velouté", 
            name_it: "Vellutata di Funghi Selvatici", 
            description_en: "Creamy forest mushrooms, thyme-infused oil, sourdough croutons.", 
            description_it: "Crema di funghi di bosco, olio infuso al timo, crostini di pasta madre.", 
            price: "€18" 
        },
        { 
            category_en: "Starters", 
            category_it: "Antipasti", 
            name_en: "Grilled Octopus", 
            name_it: "Polpo alla Griglia", 
            description_en: "Mediterranean octopus, smoked paprika potato purée, celery hearts.", 
            description_it: "Polpo del Mediterraneo, purè di patate alla paprika affumicata, cuori di sedano.", 
            price: "€24" 
        },
        { 
            category_en: "Starters", 
            category_it: "Antipasti", 
            name_en: "Heirloom Tomato & Burrata", 
            name_it: "Pomodori Heirloom e Burrata", 
            description_en: "Puglia burrata, organic tomatoes, aged balsamic, fresh basil.", 
            description_it: "Burrata pugliese, pomodori biologici, balsamico invecchiato, basilico fresco.", 
            price: "€22" 
        },
        // Main Courses / Secondi Piatti
        { 
            category_en: "Main Courses", 
            category_it: "Secondi Piatti", 
            name_en: "Black Truffle Tagliolini", 
            name_it: "Tagliolini al Tartufo Nero", 
            description_en: "Fresh egg pasta, Piedmontese butter, shaved seasonal black truffle.", 
            description_it: "Pasta fresca all'uovo, burro piemontese, scaglie di tartufo nero di stagione.", 
            price: "€38" 
        },
        { 
            category_en: "Main Courses", 
            category_it: "Secondi Piatti", 
            name_en: "Pan-Seared Chilean Seabass", 
            name_it: "Branzino Cileno Scottato", 
            description_en: "Asparagus tips, saffron beurre blanc, micro-greens.", 
            description_it: "Punte di asparagi, beurre blanc allo zafferano, micro-erbe.", 
            price: "€45" 
        },
        { 
            category_en: "Main Courses", 
            category_it: "Secondi Piatti", 
            name_en: "Roasted Lamb Chops", 
            name_it: "Costolette d'Agnello Arrostite", 
            description_en: "Herb-crusted lamb, roasted root vegetables, red wine reduction.", 
            description_it: "Agnello in crosta d'erbe, radici arrostite, riduzione al vino rosso.", 
            price: "€42" 
        },
        { 
            category_en: "Main Courses", 
            category_it: "Secondi Piatti", 
            name_en: "Lobster Linguine", 
            name_it: "Linguine all'Astice", 
            description_en: "Half lobster, cherry tomatoes, chili, garlic, parsley oil.", 
            description_it: "Mezzo astice, pomodorini, peperoncino, aglio, olio al prezzemolo.", 
            price: "€48" 
        },
        { 
            category_en: "Main Courses", 
            category_it: "Secondi Piatti", 
            name_en: "Wild Mushroom Risotto", 
            name_it: "Risotto ai Funghi Selvatici", 
            description_en: "Acquerello rice, porcini mushrooms, chives, truffle butter.", 
            description_it: "Riso Acquerello, funghi porcini, erba cipollina, burro al tartufo.", 
            price: "€34" 
        },
        { 
            category_en: "Main Courses", 
            category_it: "Secondi Piatti", 
            name_en: "Dry-Aged Ribeye (300g)", 
            name_it: "Costata di Manzo Frollata (300g)", 
            description_en: "Grass-fed beef, rosemary salt, roasted garlic, arugula salad.", 
            description_it: "Manzo grass-fed, sale al rosmarino, aglio arrostito, insalata di rucola.", 
            price: "€55" 
        },
        // Desserts / Dolci
        { 
            category_en: "Desserts", 
            category_it: "Dolci", 
            name_en: "Deconstructed Tiramisu", 
            name_it: "Tiramisù Decomposto", 
            description_en: "Espresso-soaked savoiardi, mascarpone foam, cocoa dust.", 
            description_it: "Savoiardi bagnati all'espresso, schiuma di mascarpone, polvere di cacao.", 
            price: "€14" 
        },
        { 
            category_en: "Desserts", 
            category_it: "Dolci", 
            name_en: "Warm Pistachio Fondant", 
            name_it: "Tortino Caldo al Pistacchio", 
            description_en: "Sicilian pistachio core, vanilla bean gelato.", 
            description_it: "Cuore di pistacchio di Sicilia, gelato alla vaniglia.", 
            price: "€16" 
        },
        { 
            category_en: "Desserts", 
            category_it: "Dolci", 
            name_en: "Amalfi Lemon Sorbet", 
            name_it: "Sorbetto al Limone di Amalfi", 
            description_en: "Hand-churned lemon sorbet, fresh mint, splash of prosecco.", 
            description_it: "Sorbetto al limone fatto a mano, menta fresca, spruzzo di prosecco.", 
            price: "€12" 
        },
        { 
            category_en: "Desserts", 
            category_it: "Dolci", 
            name_en: "Dark Chocolate Tart", 
            name_it: "Tortino al Cioccolato Fondente", 
            description_en: "70% dark chocolate, sea salt flakes, raspberry coulis.", 
            description_it: "Cioccolato fondente 70%, fiocchi di sale marino, coulis di lamponi.", 
            price: "€15" 
        },
        // Drinks / Bevande
        { 
            category_en: "Drinks", 
            category_it: "Bevande", 
            name_en: "Classic Negroni", 
            name_it: "Negroni Classico", 
            description_en: "Gin, Campari, Sweet Vermouth, orange peel.", 
            description_it: "Gin, Campari, Vermouth Rosso, scorza d'arancia.", 
            price: "€16" 
        },
        { 
            category_en: "Drinks", 
            category_it: "Bevande", 
            name_en: "Aura Signature Martini", 
            name_it: "Martini Aura Signature", 
            description_en: "Grey Goose vodka, dry vermouth, gold leaf olive.", 
            description_it: "Vodka Grey Goose, vermouth dry, oliva in foglia d'oro.", 
            price: "€18" 
        },
        { 
            category_en: "Drinks", 
            category_it: "Bevande", 
            name_en: "Sparkling Mineral Water", 
            name_it: "Acqua Minerale Frizzante", 
            description_en: "S.Pellegrino or Panna (750ml).", 
            description_it: "S.Pellegrino o Panna (750ml).", 
            price: "€8" 
        },
        { 
            category_en: "Drinks", 
            category_it: "Bevande", 
            name_en: "Espresso", 
            name_it: "Espresso", 
            description_en: "Single origin Arabica beans, served with a chocolate truffle.", 
            description_it: "Chicchi Arabica monorigine, serviti con tartufo al cioccolato.", 
            price: "€6" 
        },
        { 
            category_en: "Drinks", 
            category_it: "Bevande", 
            name_en: "Brunello di Montalcino", 
            name_it: "Brunello di Montalcino", 
            description_en: "Glass of premium Tuscan red wine.", 
            description_it: "Calice di vino rosso toscano pregiato.", 
            price: "€22" 
        }
    ];

    let menuItems = [...fallbackItems];

    // Safely check for Supabase variables from config.js
    const supabaseClient = window.supabaseClient || window.supabase;
    const sUrl = window.SUPABASE_URL;
    const sKey = window.SUPABASE_ANON_KEY;

    if (supabaseClient && sUrl && sUrl !== 'YOUR_SUPABASE_URL_HERE') {

        try {
            // Create a timeout promise
            const timeout = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Connection timeout')), 3000)
            );

            // Race the database fetch against the timeout
            const { data, error } = await Promise.race([
                supabaseClient.from('menu_items').select('*'),
                timeout
            ]);


            if (error) throw error;
            if (data && data.length > 0) {
                menuItems = data;
            }
        } catch (error) {
            console.warn("Connection attempt timed out or failed. Using fallback menu data.", error);
        }
    }

    // Language Toggle Listeners
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-it').addEventListener('click', () => setLanguage('it'));

    function setLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`lang-${lang}`).classList.add('active');
        
        // Update Loader text
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.textContent = lang === 'en' ? 'Refining our finest selections...' : 'Raffiniamo le nostre migliori selezioni...';
        }

        renderMenu(menuItems);
    }

    setLanguage('en');


    function renderMenu(items) {
        // Clear loader
        container.innerHTML = '';
        nav.innerHTML = '';

        // Group by category based on language
        const categorized = {};
        const categories = [];

        items.forEach(item => {
            const cat = item[`category_${currentLang}`] || item.category_en;
            if (!categorized[cat]) {
                categorized[cat] = [];
                categories.push(cat);
            }
            categorized[cat].push(item);
        });

        // 1. Render Sticky Navigation
        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = `category-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = cat;
            btn.onclick = () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Scroll to category section
                const section = document.getElementById(`cat-${cat}`);
                if (section) {
                    const navHeight = nav.offsetHeight;
                    window.scrollTo({
                        top: section.offsetTop - navHeight - 20,
                        behavior: 'smooth'
                    });
                }
            };
            nav.appendChild(btn);
        });

        // 2. Render Menu Sections
        categories.forEach(cat => {
            const section = document.createElement('div');
            section.className = 'category-section';
            section.id = `cat-${cat}`;

            const title = document.createElement('h2');
            title.className = 'category-title';
            title.textContent = cat;
            section.appendChild(title);

            const list = document.createElement('div');
            list.className = 'menu-list';

            categorized[cat].forEach(item => {
                const name = item[`name_${currentLang}`] || item.name_en;
                const desc = item[`description_${currentLang}`] || item.description_en;

                const div = document.createElement('div');
                div.className = 'menu-item';
                div.innerHTML = `
                    <div class="menu-item-header">
                        <span class="item-name">${name}</span>
                        <span class="item-price">${typeof item.price === 'number' ? '€'+item.price : item.price}</span>
                    </div>
                    <p class="item-desc">${desc}</p>
                `;
                list.appendChild(div);
            });

            section.appendChild(list);
            container.appendChild(section);
        });
    }

    // ScrollSpy: Update active nav on scroll
    window.addEventListener('scroll', () => {
        const navHeight = nav.offsetHeight;
        let currentActive = null;
        
        document.querySelectorAll('.category-section').forEach(section => {
            const top = section.offsetTop - navHeight - 50;
            if (window.scrollY >= top) {
                currentActive = section.id.replace('cat-', '');
            }
        });

        if (currentActive) {
            document.querySelectorAll('.category-btn').forEach(b => {
                if (b.textContent === currentActive) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        }
    });
});
