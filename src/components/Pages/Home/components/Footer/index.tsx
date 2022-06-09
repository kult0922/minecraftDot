import Link from "next/link";
import { useLocale } from "src/i18n/useLocale";

const Footer = () => {
  const { t } = useLocale();

  return (
    <>
      <div className="bg-neutral-900 p-6">
        <div className="flex justify-center">
          <div>
            <a
              href="https://github.com/kult0922/minecraftDot"
              target="_blank"
              className="underline decoration-solid"
              rel="noreferrer"
            >
              <div className="flex">
                <img width={22} src="/assets/GitHub-Mark-Light-64px.png" className="mr-1" />
                GitHub
              </div>
            </a>
          </div>
        </div>

        <div className="flex justify-center mt-2">
          Developed by
          <a
            href="https://twitter.com/KK_sep_TT"
            target="_blank"
            className="underline decoration-solid ml-2"
            rel="noreferrer"
          >
            @KK_sep_TT
          </a>
        </div>
        <div className="flex justify-center mt-2">
          <Link href="/privacy">
            <a className="underline text-decoration">Privacy policy</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
