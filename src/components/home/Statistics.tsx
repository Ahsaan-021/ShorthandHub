import { STATISTICS } from "@/lib/constants"
import { CountUp } from "./CountUp"

export function Statistics() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {STATISTICS.map((stat) => {
            const numericValue = parseInt(stat.value.replace(/[^\d]/g, ""), 10)
            const suffix = stat.value.replace(/[\d,]/g, "")
            return (
              <div key={stat.label} className="glass rounded-xl p-6 text-center">
                <p className="text-3xl font-bold md:text-4xl">
                  <CountUp end={numericValue} suffix={suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
