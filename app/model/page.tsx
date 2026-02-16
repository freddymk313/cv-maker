import Resume from "@/components/Resume";

const userData = {
  name: "Pedro",
  lastName: "Fernandes",
  phone: "+123-456-7890",
  email: "hello@site.com",
  address: "123 Anywhere St., Any City",
  website: "www.site.com",
  profile: "Artiste visuel créant des œuvres d'art utilisant une variété de matériaux...",
  education: [
    { school: "University Name", location: "Location", degree: "Degree Name", years: "2011 - 2015" }
  ],
  skills: ["Editing", "Layouting", "Communication", "Teamwork"],
  experience: [
    {
      title: "Job Position Here",
      company: "Company Name",
      years: "2015 - 2018",
      description: "Description courte du poste.",
      bullets: ["Réalisation de concepts créatifs", "Gestion de projets"]
    }
  ]
};

export default function Page() {
  return <Resume data={userData} />;
}