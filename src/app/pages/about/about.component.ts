import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  beliefs = [
    {
      icon: '🤖',
      title: 'AI is a Multiplier, Not a Replacement',
      description: 'We believe AI tools like Cursor amplify what developers can do — they don\'t replace the thinking. The best prompt engineers still need to understand what they\'re building.'
    },
    {
      icon: '📝',
      title: 'Clarity in Prompts = Clarity in Code',
      description: 'Writing a good prompt is a skill. Just like writing clean code, it requires precision, context, and intention. We treat prompt engineering as a first-class discipline.'
    },
    {
      icon: '🚀',
      title: 'Ship Fast, Iterate Faster',
      description: 'With AI-assisted development, the feedback loop shrinks dramatically. VibeCoding was prototyped, designed, and deployed in a single focused session.'
    },
    {
      icon: '🔓',
      title: 'Lower the Barrier, Raise the Bar',
      description: 'Prompt-driven development makes building accessible to more people — but we still hold the output to high standards. Good vibes, good code.'
    }
  ];

  timeline = [
    { year: '2025', event: 'Cursor becomes our primary IDE. We stop writing boilerplate by hand.' },
    { year: 'Early 2026', event: 'We realize entire production-ready apps can be built via structured prompts alone.' },
    { year: 'Feb 2026', event: 'VibeCoding concept is born — a platform to demonstrate and teach AI-first development.' },
    { year: 'Mar 2026', event: 'VibeCoding v1 is built from scratch inside Cursor, using only prompt engineering. This site is the result.' }
  ];
}
