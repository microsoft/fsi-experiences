import { FelaWithStylesProps } from "react-fela";
declare function ruleGen(props: any): any;
declare const rules: (props: any) => {
    rule: any;
};
declare type FelaProps<T> = FelaWithStylesProps<T, {
    rule: any;
}>;
export { ruleGen, rules, FelaProps };
