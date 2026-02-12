import Link from "next/link";

export default function page() {
  return (
    <div>
      <p>Bienvenue sur CV Maker, votre outil de création de CV en ligne !</p>
      <p>Pour commencer, veuillez vous inscrire ou vous connecter :</p>
      <ul>
        <li>
          <Link href="/register" className="text-blue-600 hover:underline">
            <span>S'inscrire</span>
          </Link>
        </li>
        <li>
          <Link href="/login" className="text-blue-600 hover:underline">
            Se connecter
          </Link>
        </li>
      </ul>
    </div>
  );
}
