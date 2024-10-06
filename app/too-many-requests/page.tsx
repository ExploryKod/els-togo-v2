"use client"; 
import { MyButton } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function TooManyRequests() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/?=' + new Date().getTime);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 border-2 border-primary p-5 border max-w-[800px]" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className="font-bold font-sans text-xl">Trop de requêtes</h1>
      <p className="font-sans text-lg">Vous avez fait trop de requêtes successives au serveur, nous avons bloqué la requête par sécurité car parfois cela est lié à des cyber-attaques.</p>
      <p className="font-sans text-lg">Mais il est probable que vous ayez juste fait trop de requêtes sans attention malicieuse comme cela arrive aussi.</p>
      <p className="font-sans text-lg">Nous vous prions de nous excuser pour la gène occasionnée et vous invitons à retourner à l&apos;accueil.</p>
      <p className="font-sans text-lg">Si le retour vers l&apos;accueil ci-dessous ne marche pas, vous devez aller consulter ce site sur un navigateur en mode inconnu.</p>
      <MyButton onClick={handleRedirect}>Retour vers l&apos;accueil</MyButton>
    </div>
  );
}
