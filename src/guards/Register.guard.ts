namespace RegisterGuard {
  export const isSystemTheme = (
    oper: unknown
  ): oper is "system" | "dark" | "light" => {
    return oper === "system" || oper === "dark" || oper === "light";
  };
}

export default RegisterGuard;
