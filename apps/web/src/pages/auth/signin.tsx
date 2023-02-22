import {Layout} from "@/components";
import type {Provider} from "next-auth/providers";
import {getProviders, signIn, useSession} from "next-auth/react";

type Props = {
  providers: Array<Provider>;
};

const LoginPage = ({providers}: Props) => {
  const {data} = useSession();

  console.log(data);

  return (
    <Layout>
      <h1 className="mb-10 text-center text-3xl font-bold">
        Velg en måte å logge inn på
      </h1>
      <div className="flex flex-col justify-center gap-3">
        {Object.values(providers).map((provider) => (
          <div className="mx-auto" key={provider.name}>
            <button onClick={() => void signIn(provider.id)}>
              Logg inn med {provider.name}
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const providers = await getProviders();

  return {
    props: {providers},
  };
};

export default LoginPage;
