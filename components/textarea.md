A multi-line text field for narrative: notes, rationales, SAR text.

Same wrapper and rules as Input — `hb-field`, a visible associated label, help or
error text below. The consumer sets `rows` to the shortest height that fits a typical
answer; three is the default. It resizes vertically only.

Use it wherever the analyst is writing prose a regulator may read. Do not use it for
a value with a fixed shape (an account number, an amount) — that is an Input, and the
single line is itself a hint about the expected length.

Never enforce a character limit without showing the count and never truncate what was
typed on save.
