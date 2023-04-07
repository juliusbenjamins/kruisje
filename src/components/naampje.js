function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export const Naampje = () => {
    const naampjes = ["Laafje 1", "Laafje 2", "Laafje 3"];
    var huidigNaampje = naampjes[getRandomInt(3)]

    return (
		<div>
			{huidigNaampje}
		</div>
	)
};