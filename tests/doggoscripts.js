// Test cases from the original assignment
doggoscripts = [
    {
	script:	`lassie AWOO 5
        luna AWOO 6
        bailey AWOO lassie WOOF luna
        bailey`,
	expect: 11
    },
    {
	script: `roi AWOO 5
	RUF? roi YAP 2 VUH
	  roi AWOO roi ARF 3
	ROWH
	  roi AWOO roi WOOF 100
	ARRUF
	roi`,
	expect: 15
    },
    {
	script: `roi AWOO 5
	RUF? roi YIP 2 VUH
	  roi AWOO roi ARF 3
	ROWH
	  roi AWOO roi WOOF 100
	ARRUF
	roi`,
	expect: 105
    },
    {
	script: `quark AWOO 6 BARK 2
	gromit AWOO 5
	milo AWOO 0
	GRRR milo YIP gromit BOW
	  quark AWOO quark WOOF 3
	  milo AWOO milo WOOF 1
	BORF
	quark`,
	expect: 19
    }
]
// The script we need to get the correct answer for
mystery_script = `
samantha AWOO 1
hooch AWOO 500
einstein AWOO 10
fuji AWOO 0
GRRR fuji YIP hooch BOW
    samantha AWOO samantha WOOF 3
    RUF? samantha YAP 100 VUH
      samantha AWOO samantha BARK 1
    ROWH
      einstein AWOO einstein WOOF 1
      samantha AWOO samantha ARF einstein
    ARRUF
    fuji AWOO fuji WOOF 1
BORF
GRRR fuji YAP 0 BOW
    samantha AWOO samantha WOOF 375
    fuji AWOO fuji BARK 3
BORF
samantha`
