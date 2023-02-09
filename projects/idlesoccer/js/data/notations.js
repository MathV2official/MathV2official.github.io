let notations = [
    new ADNotations.StandardNotation(),
    new ADNotations.ScientificNotation(),
    new ADNotations.EngineeringNotation(),
    new ADNotations.LogarithmNotation(),
    new ADNotations.LettersNotation(),
    new ADNotations.CancerNotation()
];
for(let k of Object.keys(ADNotations)){
    if(!["AllNotation", "CustomNotation", "Notation", "Settings"].includes(k)){
        let notation = new ADNotations[k]();
        if(!notations.find(n => n.name === notation.name)){
            notations.push(notation);
        }
    }
}