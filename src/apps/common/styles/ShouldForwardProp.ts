const ShouldForwardProp = {
  shouldForwardProp: (prop: string) => !prop.startsWith("$"),
};

export default ShouldForwardProp;
