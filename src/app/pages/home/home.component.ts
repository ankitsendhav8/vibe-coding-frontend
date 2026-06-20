import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActiveUsersComponent } from '../../components/active-users/active-users.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ActiveUsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public authService: AuthService) {}

  features = [
    {
      icon: '🤖',
      title: 'Prompt-First Development',
      description: 'Describe what you want to build in plain English. Our AI-driven workflow turns your ideas into working code — no boilerplate, no guessing.'
    },
    {
      icon: '⚡',
      title: 'Powered by Cursor',
      description: 'Built entirely inside Cursor — the AI-native IDE. Every component, route, and style was generated and refined through intelligent prompting.'
    },
    {
      icon: '🧠',
      title: 'Claude & GPT Ready',
      description: 'Works seamlessly with Claude, GPT-4o, and other leading LLMs. Pick your model, write your prompt, and watch the code appear.'
    },
    {
      icon: '🔁',
      title: 'Iterate in Seconds',
      description: 'Don\'t like a section? Just re-prompt it. AI-first development means your feedback loop is instant — no rewrites from scratch.'
    },
    {
      icon: '📦',
      title: 'Full Stack Out of the Box',
      description: 'Angular frontend. Node.js + Express backend. SQL database. All wired together — because we told the AI exactly what we needed.'
    },
    {
      icon: '🧩',
      title: 'Vibe-Coded Architecture',
      description: 'Components, routes, services, and APIs — all generated via structured prompts. The codebase is clean because the prompts were clear.'
    }
  ];

  stats = [
    { value: '100%', label: 'AI Generated' },
    { value: '0', label: 'Lines Hand-Written' },
    { value: 'Cursor', label: 'IDE of Choice' },
    { value: '~2hrs', label: 'Build Time' }
  ];

  stack = [
    { label: 'Frontend', value: 'Angular 18' },
    { label: 'Backend', value: 'Node.js + Express' },
    { label: 'Database', value: 'MS SQL Server' },
    { label: 'AI Model', value: 'Claude (Cursor)' },
    { label: 'Method', value: 'Prompt Engineering' },
    { label: 'IDE', value: 'Cursor AI' }
  ];
}
