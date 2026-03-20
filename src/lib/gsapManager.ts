import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Centralized GSAP context management to prevent memory leaks
 * and manage animation lifecycle properly
 */
class GSAPManager {
  private activeContexts: Map<string, gsap.Context> = new Map();
  private activeScrollTriggers: Map<string, ScrollTrigger> = new Map();

  /**
   * Create a namespaced GSAP context
   */
  createContext(
    id: string,
    callback: (context: gsap.Context) => void,
    scope?: Element | string
  ): gsap.Context {
    // Kill existing context with same id
    this.killContext(id);

    const ctx = gsap.context(callback, scope);
    this.activeContexts.set(id, ctx);
    return ctx;
  }

  /**
   * Kill a specific context by id
   */
  killContext(id: string): void {
    const ctx = this.activeContexts.get(id);
    if (ctx) {
      ctx.revert();
      this.activeContexts.delete(id);
    }
  }

  /**
   * Kill all contexts
   */
  killAllContexts(): void {
    this.activeContexts.forEach((ctx) => ctx.revert());
    this.activeContexts.clear();
  }

  /**
   * Register a scroll trigger for tracking
   */
  registerScrollTrigger(id: string, trigger: ScrollTrigger): void {
    // Kill existing trigger with same id
    this.killScrollTrigger(id);
    this.activeScrollTriggers.set(id, trigger);
  }

  /**
   * Kill a specific scroll trigger by id
   */
  killScrollTrigger(id: string): void {
    const trigger = this.activeScrollTriggers.get(id);
    if (trigger) {
      trigger.kill();
      this.activeScrollTriggers.delete(id);
    }
  }

  /**
   * Kill all scroll triggers
   */
  killAllScrollTriggers(): void {
    this.activeScrollTriggers.forEach((trigger) => trigger.kill());
    this.activeScrollTriggers.clear();
  }

  /**
   * Get a context by id
   */
  getContext(id: string): gsap.Context | undefined {
    return this.activeContexts.get(id);
  }

  /**
   * Check if context exists
   */
  hasContext(id: string): boolean {
    return this.activeContexts.has(id);
  }

  /**
   * Get all active contexts
   */
  getAllContexts(): Map<string, gsap.Context> {
    return new Map(this.activeContexts);
  }

  /**
   * Clean up everything
   */
  cleanup(): void {
    this.killAllContexts();
    this.killAllScrollTriggers();
  }

  /**
   * Get manager status for debugging
   */
  getStatus(): {
    contextCount: number;
    scrollTriggerCount: number;
    contexts: string[];
    scrollTriggers: string[];
  } {
    return {
      contextCount: this.activeContexts.size,
      scrollTriggerCount: this.activeScrollTriggers.size,
      contexts: Array.from(this.activeContexts.keys()),
      scrollTriggers: Array.from(this.activeScrollTriggers.keys()),
    };
  }
}

// Export singleton instance
export const gsapManager = new GSAPManager();

export default gsapManager;
