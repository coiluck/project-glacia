// i18n の {0} {1} … を埋める
export const fill = (template: string, ...values: (string | number)[]) =>
  template.replace(/\{(\d+)\}/g, (match, index: string) => String(values[Number(index)] ?? match))
