A binary switch whose change takes effect immediately.

Structure: an `hb-toggle` label wrapping `hb-toggle__input`, an `hb-toggle__track`
containing `hb-toggle__thumb`, and `hb-toggle__label`. Track 36×20px, thumb 16×16px,
8px from track to label.

Use it for a setting that applies the moment it is flipped — a notification
preference, a view filter. If the change only lands on Save, use a Checkbox: the
toggle's whole meaning is immediacy.

The consumer supplies the label, phrased as the on state ("Include closed alerts"),
never as a question and never as a pair of words. If the switch cannot be changed,
disable it and say why beside it, as with an enforced policy.
