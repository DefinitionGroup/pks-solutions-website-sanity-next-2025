import Button2 from "./Button2";
import DebugBadge from "@/components/dev/DebugBadge";
export default function GetDemoComponent() {
  return (
    <div className="bg-gray-50 dark:bg-slate-950">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-semibold text-base/7 text-red-600 dark:text-red-500">
          Jetzt starten.
        </h2>
        <p className="mt-2 font-semibold text-4xl text-balance text-gray-900 dark:text-white sm:text-5xl tracking-tight">
          Bringen Sie Ihre Zeiterfassung und Produktionsanalyse auf ein neues
          Level.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-gray-600 dark:text-gray-400 text-lg/8 text-pretty">
          Wir zeigen Ihnen in einem persönlichen Meeting, wie PKS Ihre
          Organisationsherausforderungen meistern kann.
        </p>
        <div className="flex justify-center">
          <div className="flex justify-center mt-8 w-64 text-gray-900 dark:text-white">
            <DebugBadge name="Button2">
              <Button2
                text="Demo anfordern."
                className="border-gray-300 dark:border-white/20 border-r border-l"
              />
            </DebugBadge>
          </div>
        </div>
      </div>
    </div>
  );
}
