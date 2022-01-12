import adapterStatic from "@sveltejs/adapter-static"
import type { Adapter } from "@sveltejs/kit"

type AdapterStaticOptions = Parameters<typeof adapterStatic>[0]
/**
 * Creates svelte-adapter-ghpages
 */
export default function (options: AdapterStaticOptions): Adapter {
    const baseStatic = adapterStatic(options)
    const pages = options?.pages || "build"
    return {
        name: "svelte-adapter-ghpages",
        async adapt(builder) {
            await baseStatic.adapt(builder)
            builder.copy(`${pages}/404/index.html`, `${pages}/404.html`)
            builder.rimraf(`${pages}/404`)
        },
    }
}
