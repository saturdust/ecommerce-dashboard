import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import updateQueryParams from "@/utils/update-query-params";
import { AuxEmiter } from "../model/events";

interface Dependencies {
  emitter: AuxEmiter;
}

const useEventFilter = (deps: Dependencies) => {
  const { emitter } = deps;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const search = searchParams.get("q") ?? "";
  const catSearchParams = searchParams.get("cat") ?? "";

  const [keyword, setKeyword] = useState(search);
  const [category, setCategory] = useState(catSearchParams);

  const timeoutRef = useRef<any>();

  const _onSelectCategory = useCallback(
    (value: string) => {
      setKeyword("");
      setCategory(value);

      const params = new URLSearchParams(searchParams as unknown as string);
      router.push(
        pathname + "?" + updateQueryParams(params, { cat: value }, ["q"])
      );
    },
    [pathname, router, searchParams]
  );

  const _onSearch = useCallback(
    (value: string) => {
      timeoutRef.current = clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setCategory("");
        setKeyword(value);

        const params = new URLSearchParams(searchParams as unknown as string);
        router.push(
          pathname + "?" + updateQueryParams(params, { q: value }, ["cat"])
        );
      }, 500);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    emitter.on("@filter/select-category", _onSelectCategory);
    emitter.on("@search", _onSearch);

    () => {
      emitter.off("@filter/select-category", _onSelectCategory);
      emitter.off("@search", _onSearch);
    };
  }, [emitter, _onSearch, _onSelectCategory]);

  return { keyword, category };
};

export default useEventFilter;
