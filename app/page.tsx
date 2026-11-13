"use client";

import { useState } from "react";

export default function Home() {
  const [taches, setTaches] = useState<string[]>([]);

  function ajouterTache(tache: string) {
    setTaches((t) => [...t, tache]);
  }

  function supprimerTache(index: number) {
    setTaches((t) => t.filter((_, ind) => ind !== index));
  }

  function modifierTache(index: number, nouvelleTache: string) {
    setTaches((t) => t.map((tache, ind) => (ind === index ? nouvelleTache : tache)));
  }

  return (
    <div className="mx-auto max-w-[1250px] px-5 py-3">
      <header className="rounded-full bg-brand py-4 text-center">
        <h1 className="text-3xl font-bold text-white">Gestion des Tâches</h1>
      </header>

      <main className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.4fr]">
        <FormulaireAjoutTache onAjouter={ajouterTache} />
        <ListeDesTaches
          taches={taches}
          onSupprimer={supprimerTache}
          onModifier={modifierTache}
        />
      </main>
    </div>
  );
}

// ---------- Formulaire d'ajout ----------
type FormulaireProps = {
  onAjouter: (tache: string) => void;
};

function FormulaireAjoutTache({ onAjouter }: FormulaireProps) {
  const [texte, setTexte] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // évite le rechargement de la page
    const valeur = texte.trim();
    if (!valeur) return;
    onAjouter(valeur);
    setTexte("");
  }

  return (
    <section className="self-start">
      <div className="rounded-t-md bg-brand py-4 text-center">
        <h2 className="text-xl font-bold text-white">Ajouter une tâche</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-1.5 rounded-b-2xl border border-t-0 border-navy px-5 pb-12 pt-14"
      >
        <label htmlFor="tache" className="mb-1.5 block text-lg">
          Ajouter une tâche
        </label>
        <input
          id="tache"
          type="text"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          className="w-full rounded-lg bg-neutral-200 px-3 py-2.5 text-lg outline-none focus:ring-2 focus:ring-brand"
        />
        <button
          type="submit"
          className="mt-3.5 rounded-md bg-brand px-3 py-2 text-lg text-white hover:bg-sky-500"
        >
          Ajouter une tâche
        </button>
      </form>
    </section>
  );
}

// ---------- Liste des tâches ----------
type ListeProps = {
  taches: string[];
  onSupprimer: (index: number) => void;
  onModifier: (index: number, nouvelleTache: string) => void;
};

function ListeDesTaches({ taches, onSupprimer, onModifier }: ListeProps) {
  function handleModifier(index: number) {
    const nouvelle = prompt("Modifier la tâche :", taches[index]);
    if (nouvelle && nouvelle.trim()) onModifier(index, nouvelle.trim());
  }

  return (
    <section>
      <div className="rounded-t-md bg-brand py-4 text-center">
        <h2 className="text-xl font-bold text-white">Liste des Tâches</h2>
      </div>
      <div className="mx-1.5 min-h-[240px] rounded-b-2xl border border-t-0 border-navy px-3 pb-8 pt-5 sm:px-4">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-lg">
            <thead>
              <tr className="bg-neutral-200">
                <th className="w-16 py-2 font-normal">#</th>
                <th className="py-2 font-normal">Tâche</th>
                <th className="w-64 py-2 font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(odd)]:bg-neutral-100 [&>tr:nth-child(even)]:bg-neutral-200">
              {taches.map((tache, index) => (
                <tr key={index}>
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{tache}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleModifier(index)}
                      className="rounded bg-brand px-3 py-1 text-xs font-bold text-white hover:bg-sky-500"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onSupprimer(index)}
                      className="ml-2 rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}