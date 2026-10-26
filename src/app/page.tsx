
"use client";

import { useMemo, useState } from "react";

type Plant = {
  name: string;
  scientific: string;
  category: string;
  feature: string;
  uses: string;
  habitat: string;
};

const rawPlants: [string, string, string, string, string][] = [
  ["Neem", "Azadirachta indica", "Trees", "Compound leaves with serrated leaflets.", "Shade and traditional uses."],
  ["Mango", "Mangifera indica", "Fruits", "Long, leathery leaves and fleshy fruit.", "Edible fruit."],
  ["Banyan", "Ficus benghalensis", "Trees", "Large canopy and aerial prop roots.", "Shade and habitat."],
  ["Peepal", "Ficus religiosa", "Trees", "Heart-shaped leaves with long tips.", "Shade and cultural importance."],
  ["Eucalyptus", "Eucalyptus globulus", "Trees", "Aromatic leaves and smooth bark.", "Timber and essential oils."],
  ["Shisham", "Dalbergia sissoo", "Trees", "Pinnate leaves and woody pods.", "Furniture and timber."],
  ["Kikar", "Vachellia nilotica", "Trees", "Thorny branches and small leaflets.", "Fodder and fuelwood."],
  ["Poplar", "Populus deltoides", "Trees", "Broad leaves with flattened stalks.", "Timber and shelterbelts."],
  ["Willow", "Salix alba", "Trees", "Narrow leaves with finely toothed margins.", "Ornamental planting."],
  ["Mulberry", "Morus alba", "Fruits", "Variable, often lobed leaves.", "Fruit and silkworm food."],

  ["Rose", "Rosa indica", "Flowers", "Prickly stems and compound leaves.", "Ornamental and perfumery."],
  ["Sunflower", "Helianthus annuus", "Flowers", "Large flower head and broad rough leaves.", "Edible seeds and oil."],
  ["Marigold", "Tagetes erecta", "Flowers", "Strong-smelling divided leaves.", "Ornamental planting."],
  ["Jasmine", "Jasminum sambac", "Flowers", "Glossy simple leaves and fragrant flowers.", "Perfume and ornament."],
  ["Hibiscus", "Hibiscus rosa-sinensis", "Flowers", "Large flowers and toothed leaves.", "Ornamental planting."],
  ["Tulip", "Tulipa gesneriana", "Flowers", "Upright flowers and smooth leaves.", "Ornamental planting."],
  ["Daisy", "Bellis perennis", "Flowers", "Flower heads with central disc.", "Ornamental planting."],
  ["Dahlia", "Dahlia pinnata", "Flowers", "Divided leaves and showy flower heads.", "Garden decoration."],
  ["Chrysanthemum", "Chrysanthemum morifolium", "Flowers", "Lobed leaves and dense flower heads.", "Ornamental planting."],
  ["Bougainvillea", "Bougainvillea spectabilis", "Flowers", "Woody climbing stems and colorful bracts.", "Hedges and decoration."],

  ["Mint", "Mentha spicata", "Herbs", "Aromatic opposite leaves with toothed edges.", "Food flavoring."],
  ["Basil", "Ocimum basilicum", "Herbs", "Aromatic leaves on square stems.", "Culinary herb."],
  ["Holy Basil", "Ocimum tenuiflorum", "Herbs", "Aromatic, slightly toothed leaves.", "Traditional uses."],
  ["Coriander", "Coriandrum sativum", "Herbs", "Fine divided leaves and round fruits.", "Leaves and seeds for cooking."],
  ["Parsley", "Petroselinum crispum", "Herbs", "Bright green divided leaves.", "Food garnish."],
  ["Rosemary", "Salvia rosmarinus", "Herbs", "Narrow, needle-like aromatic leaves.", "Seasoning."],
  ["Thyme", "Thymus vulgaris", "Herbs", "Tiny aromatic leaves on woody stems.", "Seasoning."],
  ["Oregano", "Origanum vulgare", "Herbs", "Small opposite aromatic leaves.", "Seasoning."],
  ["Lemongrass", "Cymbopogon citratus", "Herbs", "Long, narrow, lemon-scented blades.", "Tea and flavoring."],
  ["Aloe Vera", "Aloe vera", "Succulents", "Thick, fleshy leaves arranged in a rosette.", "Ornamental and cosmetic products."],

  ["Tomato", "Solanum lycopersicum", "Vegetables", "Compound, often hairy leaves and berries.", "Edible fruit."],
  ["Potato", "Solanum tuberosum", "Vegetables", "Compound leaves and underground tubers.", "Edible tubers."],
  ["Onion", "Allium cepa", "Vegetables", "Hollow cylindrical leaves and bulb.", "Food seasoning."],
  ["Garlic", "Allium sativum", "Vegetables", "Flat narrow leaves and segmented bulb.", "Food seasoning."],
  ["Carrot", "Daucus carota", "Vegetables", "Feathery leaves and orange taproot in common varieties.", "Edible root."],
  ["Radish", "Raphanus sativus", "Vegetables", "Rough leaves and swollen edible root.", "Edible root."],
  ["Spinach", "Spinacia oleracea", "Vegetables", "Soft green leaves in a basal rosette.", "Leafy vegetable."],
  ["Lettuce", "Lactuca sativa", "Vegetables", "Soft leaves forming loose or dense heads.", "Salads."],
  ["Cabbage", "Brassica oleracea", "Vegetables", "Broad leaves forming a compact head.", "Edible leaves."],
  ["Cauliflower", "Brassica oleracea var. botrytis", "Vegetables", "Broad leaves around a compact flower head.", "Edible flower head."],

  ["Brinjal", "Solanum melongena", "Vegetables", "Broad leaves and usually purple fruits.", "Edible fruit."],
  ["Chilli", "Capsicum annuum", "Vegetables", "Simple leaves and slender or broad fruits.", "Spice and seasoning."],
  ["Okra", "Abelmoschus esculentus", "Vegetables", "Palmately lobed leaves and ridged pods.", "Edible pods."],
  ["Cucumber", "Cucumis sativus", "Vegetables", "Rough, broad leaves and climbing tendrils.", "Edible fruit."],
  ["Pumpkin", "Cucurbita moschata", "Vegetables", "Large lobed leaves and trailing stems.", "Edible fruit and seeds."],
  ["Bottle Gourd", "Lagenaria siceraria", "Vegetables", "Soft hairy leaves and climbing tendrils.", "Edible fruit."],
  ["Bitter Gourd", "Momordica charantia", "Vegetables", "Deeply lobed leaves and warty fruit.", "Edible fruit."],
  ["Pea", "Pisum sativum", "Vegetables", "Compound leaves ending in tendrils.", "Edible seeds and pods."],
  ["Lettuce Tree", "Lactuca indica", "Vegetables", "Upright growth and elongated leaves.", "Leafy food in some regions."],
  ["Sweet Potato", "Ipomoea batatas", "Vegetables", "Heart-shaped or lobed leaves and storage roots.", "Edible roots and leaves."],

  ["Apple", "Malus domestica", "Fruits", "Oval toothed leaves and pome fruit.", "Edible fruit."],
  ["Banana", "Musa acuminata", "Fruits", "Very large leaves with prominent midrib.", "Edible fruit."],
  ["Orange", "Citrus sinensis", "Fruits", "Glossy leaves and citrus fruit.", "Edible fruit and juice."],
  ["Lemon", "Citrus limon", "Fruits", "Aromatic leaves and yellow acidic fruit.", "Food and drinks."],
  ["Guava", "Psidium guajava", "Fruits", "Opposite leaves with prominent veins.", "Edible fruit."],
  ["Papaya", "Carica papaya", "Fruits", "Large palmately lobed leaves on long stalks.", "Edible fruit."],
  ["Pomegranate", "Punica granatum", "Fruits", "Glossy narrow leaves and leathery fruit.", "Edible arils."],
  ["Grapes", "Vitis vinifera", "Fruits", "Lobed leaves and climbing tendrils.", "Fresh fruit and raisins."],
  ["Watermelon", "Citrullus lanatus", "Fruits", "Deeply divided leaves and trailing vines.", "Edible fruit."],
  ["Muskmelon", "Cucumis melo", "Fruits", "Rough lobed leaves and trailing vines.", "Edible fruit."],

  ["Peach", "Prunus persica", "Fruits", "Narrow, pointed, finely toothed leaves.", "Edible fruit."],
  ["Apricot", "Prunus armeniaca", "Fruits", "Broad leaves with pointed tips.", "Edible fruit."],
  ["Plum", "Prunus domestica", "Fruits", "Oval toothed leaves and fleshy fruit.", "Edible fruit."],
  ["Pear", "Pyrus communis", "Fruits", "Rounded to oval leaves with toothed edges.", "Edible fruit."],
  ["Strawberry", "Fragaria × ananassa", "Fruits", "Three toothed leaflets and runners.", "Edible fruit."],
  ["Pineapple", "Ananas comosus", "Fruits", "Spiny, stiff leaves in a rosette.", "Edible fruit."],
  ["Date Palm", "Phoenix dactylifera", "Fruits", "Long feather-like fronds.", "Edible dates."],
  ["Olive", "Olea europaea", "Fruits", "Narrow leathery leaves with pale undersides.", "Olive fruit and oil."],
  ["Fig", "Ficus carica", "Fruits", "Broad, deeply lobed leaves.", "Edible fruit."],
  ["Lychee", "Litchi chinensis", "Fruits", "Pinnate leaves and clusters of red-skinned fruit.", "Edible fruit."],

  ["Wheat", "Triticum aestivum", "Cereals", "Narrow leaves and grain-bearing ears.", "Flour and food."],
  ["Rice", "Oryza sativa", "Cereals", "Narrow leaves and branched grain panicles.", "Staple food."],
  ["Maize", "Zea mays", "Cereals", "Tall stem, long leaves and cobs.", "Food, feed and starch."],
  ["Barley", "Hordeum vulgare", "Cereals", "Narrow leaves and long-awned spikes.", "Grain and animal feed."],
  ["Oats", "Avena sativa", "Cereals", "Narrow leaves and loose grain panicles.", "Food and animal feed."],
  ["Sorghum", "Sorghum bicolor", "Cereals", "Tall grass with dense grain heads.", "Grain and fodder."],
  ["Pearl Millet", "Cenchrus americanus", "Cereals", "Tall grass and compact cylindrical heads.", "Grain and fodder."],
  ["Sugarcane", "Saccharum officinarum", "Cereals", "Tall jointed stems and long leaves.", "Sugar production."],
  ["Quinoa", "Chenopodium quinoa", "Cereals", "Broad variable leaves and dense seed clusters.", "Edible seeds."],
  ["Millet", "Panicum miliaceum", "Cereals", "Grass leaves and branched seed heads.", "Grain and feed."],

  ["Peepal Cactus", "Opuntia ficus-indica", "Succulents", "Flat fleshy pads with spines.", "Fruit and living fences."],
  ["Agave", "Agave americana", "Succulents", "Thick, pointed leaves in a rosette.", "Ornamental planting and fiber."],
  ["Snake Plant", "Dracaena trifasciata", "Succulents", "Upright sword-shaped patterned leaves.", "Indoor decoration."],
  ["Jade Plant", "Crassula ovata", "Succulents", "Thick oval succulent leaves.", "Ornamental planting."],
  ["Crown of Thorns", "Euphorbia milii", "Succulents", "Spiny stems and small leaves.", "Ornamental planting."],
  ["Kalanchoe", "Kalanchoe blossfeldiana", "Succulents", "Fleshy leaves and clusters of flowers.", "Indoor decoration."],
  ["Prickly Pear", "Opuntia stricta", "Succulents", "Flattened pads with clusters of spines.", "Wildlife habitat and hedges."],
  ["Echeveria", "Echeveria elegans", "Succulents", "Compact rosette of fleshy leaves.", "Ornamental planting."],
  ["Ponytail Palm", "Beaucarnea recurvata", "Succulents", "Swollen trunk base and cascading narrow leaves.", "Indoor decoration."],
  ["Zebra Haworthia", "Haworthiopsis attenuata", "Succulents", "Small rosette with white raised bands.", "Indoor decoration."],

  ["Hibiscus Rosa", "Hibiscus rosa-sinensis", "Shrubs", "Large flowers and glossy toothed leaves.", "Ornamental hedges."],
  ["Oleander", "Nerium oleander", "Shrubs", "Narrow leathery leaves in whorls.", "Ornamental planting; toxic if ingested."],
  ["Henna", "Lawsonia inermis", "Shrubs", "Small opposite leaves and fragrant flowers.", "Natural dye."],
  ["Cotton", "Gossypium hirsutum", "Fibres", "Palmately lobed leaves and fluffy seed fibers.", "Textile fiber."],
  ["Jute", "Corchorus olitorius", "Fibres", "Long leaves with toothed margins.", "Natural fiber."],
  ["Flax", "Linum usitatissimum", "Fibres", "Slender stems and narrow leaves.", "Fiber and seeds."],
  ["Sun Hemp", "Crotalaria juncea", "Legumes", "Upright stems and simple narrow leaves.", "Green manure and fiber."],
  ["Chickpea", "Cicer arietinum", "Legumes", "Compound leaves with small toothed leaflets.", "Edible seeds."],
  ["Lentil", "Lens culinaris", "Legumes", "Slender stems and small paired leaflets.", "Edible seeds."],
  ["Soybean", "Glycine max", "Legumes", "Leaves with three leaflets and hairy pods.", "Food, oil and feed."]
];

const plants: Plant[] = rawPlants.map(
  ([name, scientific, category, feature, uses]) => ({
    name,
    scientific,
    category,
    feature,
    uses,
    habitat:
      category === "Cereals"
        ? "Cultivated agricultural fields"
        : category === "Fruits" || category === "Vegetables"
        ? "Gardens, orchards or agricultural fields"
        : "Gardens, natural habitats or cultivated landscapes"
  })
);

const categories = [
  "All",
  "Trees",
  "Flowers",
  "Herbs",
  "Vegetables",
  "Fruits",
  "Cereals",
  "Succulents",
  "Shrubs",
  "Fibres",
  "Legumes"
];

const pictures = [
  "photo-1501004318641-b39e6451bec6",
  "photo-1497250681960-ef046c08a56e",
  "photo-1485955900006-10f4d324d411",
  "photo-1416879595882-3373a0480b5b",
  "photo-1509423350716-97f2360af2e4"
];

function plantImage(index: number) {
  return `https://images.unsplash.com/${pictures[index % pictures.length]}?auto=format&fit=crop&w=700&q=80`;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Plant | null>(null);

  const filteredPlants = useMemo(() => {
    const term = search.trim().toLowerCase();

    return plants.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(term) ||
        plant.scientific.toLowerCase().includes(term) ||
        plant.category.toLowerCase().includes(term);

      const matchesCategory =
        category === "All" || plant.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-[#f5f8ef] text-[#203b2b]">
      <header className="sticky top-0 z-20 border-b border-green-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          <a href="#" className="text-xl font-black tracking-tight text-green-800">
            🌿 PlantVerse
          </a>
          <a
            href="#plants"
            className="rounded-full bg-green-800 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            Explore Plants
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-800 to-emerald-700 px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-green-200">
            Discover • Identify • Learn
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Your Digital Plant Encyclopedia
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-green-100 md:text-lg">
            Explore 100 plants, discover their scientific names, learn
            identification features and understand their uses.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#plants"
              className="rounded-full bg-white px-6 py-3 font-bold text-green-900 hover:bg-green-50"
            >
              Explore the collection →
            </a>
            <span className="rounded-full border border-green-200/40 px-5 py-3 text-sm">
              🌱 {plants.length} plant profiles
            </span>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["100", "Plant profiles"],
              ["10", "Categories"],
              ["24/7", "Learning"],
            ].map(([number, label]) => (
              <div key={label} className="rounded-2xl bg-white/10 p-4">
                <p className="text-2xl font-black">{number}</p>
                <p className="mt-1 text-xs text-green-100 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plants" className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">
            Plant library
          </p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            Explore the green world
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Search by common name, scientific name or category.
          </p>
        </div>

        <div className="mb-5">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="🔍 Search Neem, Rosa indica, Fruits..."
            className="w-full rounded-2xl border border-green-200 bg-white px-5 py-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === item
                  ? "bg-green-800 text-white"
                  : "border border-green-200 bg-white text-green-900 hover:bg-green-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between">
          <p className="font-semibold">
            {filteredPlants.length} plants found
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="text-sm font-semibold text-green-800 underline"
          >
            Reset filters
          </button>
        </div>

        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPlants.map((plant) => {
              const index = plants.indexOf(plant);

              return (
                <article
                  key={plant.scientific + plant.name}
                  className="group overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <button
                    onClick={() => setSelected(plant)}
                    className="block w-full text-left"
                    aria-label={`View details for ${plant.name}`}
                  >
                    <div className="relative h-48 overflow-hidden bg-green-100">
                      <img
                        src={plantImage(index)}
                        alt={`Botanical illustration placeholder for ${plant.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-green-800">
                        {plant.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold">{plant.name}</h3>
                      <p className="mt-1 text-sm italic text-green-700">
                        {plant.scientific}
                      </p>
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
                        {plant.feature}
                      </p>
                      <p className="mt-5 font-bold text-green-800">
                        View plant details →
                      </p>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center">
            <p className="text-4xl">🌱</p>
            <h3 className="mt-4 text-xl font-bold">No plants found</h3>
            <p className="mt-2 text-gray-600">
              Try another plant name or select a different category.
            </p>
          </div>
        )}
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="plant-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={plantImage(plants.indexOf(selected))}
              alt={`Plant profile image for ${selected.name}`}
              className="h-56 w-full object-cover"
            />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                    {selected.category}
                  </span>
                  <h2 id="plant-title" className="mt-3 text-3xl font-black">
                    {selected.name}
                  </h2>
                  <p className="mt-1 italic text-green-700">
                    {selected.scientific}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close plant details"
                  className="rounded-full bg-gray-100 px-3 py-2 font-bold hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-bold">🔬 Identification features</h3>
                  <p className="mt-1 leading-6 text-gray-600">
                    {selected.feature}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">🌍 Habitat</h3>
                  <p className="mt-1 leading-6 text-gray-600">
                    {selected.habitat}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">🌱 Uses</h3>
                  <p className="mt-1 leading-6 text-gray-600">
                    {selected.uses}
                  </p>
                </div>
              </div>

              <p className="mt-6 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                Educational reference only. Confirm identification using
                reliable botanical references before consuming or handling
                an unfamiliar plant.
              </p>

              <button
                onClick={() => setSelected(null)}
                className="mt-5 w-full rounded-xl bg-green-800 py-3 font-bold text-white hover:bg-green-700"
              >
                Back to encyclopedia
              </button>
            </div>
          </section>
        </div>
      )}

      <footer className="mt-10 bg-green-950 px-5 py-10 text-center text-white">
        <p className="text-2xl font-black">🌿 PlantVerse</p>
        <p className="mt-3 text-sm text-green-200">
          Explore plants. Learn botany. Protect nature.
        </p>
        <p className="mt-5 text-xs text-green-300">
          Educational Plant Encyclopedia · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
