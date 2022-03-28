import { BusinessError } from "./BusinessError";
import { NotFoundError } from "./NotFoundError";

export class Assertion {

	constructor() { }

	assertEquals(anObject1, anObject2, aMessage, aSource) {
		if (anObject1 !== anObject2)
			throw new BusinessError({
				detail: aMessage,
				source: aSource
			});
	}

	assertNotEquals(anObject1, anObject2, aMessage, aSource) {
		if (anObject1 === anObject2)
			throw new BusinessError({
				detail: aMessage,
				source: aSource
			});
	}

	assertNotNull(anObject, aMessage, aSource) {
		if (!anObject)
			throw new BusinessError({
				detail: aMessage,
				source: aSource
			});
	}

	assertNull(anObject, aMessage, aSource) {
		if (anObject)
			throw new BusinessError({
				detail: aMessage,
				source: aSource
			});
	}

	assertTrue(anValue, aMessage, aSource) {
		if (!anValue)
			throw new BusinessError({
				detail: aMessage,
				source: aSource
			});
	}

	assertFalse(anValue, aMessage, aSource) {
		if (anValue)
			throw new BusinessError({
				detail: aMessage,
				source: aSource
			});
	}

	assertNotEmpty(anValue: any = [], aMessage, aSource) {
		if (anValue.length === 0)
			throw new BusinessError({
				detail: aMessage,
				source: aSource
			});
	}

	assertNotFound(anObject, aMessage, aSource) {
		if (!anObject)
			throw new NotFoundError({
				detail: aMessage,
				source: aSource
			});
	}

	assertInterval(anValue, aMin, aMax, aMessage, aSource) {
		if (anValue < aMin || anValue > aMax)
			throw new BusinessError({
				detail: aMessage,
				source: aSource
			});
	}
}